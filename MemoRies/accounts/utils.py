from six import text_type
import threading

# Imports for email functionality
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.conf import settings
from django.contrib.sites.models import Site
from templated_email import get_templated_mail

# For token generation
from django.contrib.auth.tokens import PasswordResetTokenGenerator


class EmailThread(threading.Thread):
    """
    Threaded email sending to avoid blocking the main process.
    """
    def __init__(self, email_message):
        self.email_message = email_message
        threading.Thread.__init__(self)

    def run(self):
        self.email_message.send()


def send_html_mail(templated_email_to_send):
    """
    Sends an email in a separate thread for better performance.
    """
    EmailThread(templated_email_to_send).start()


class TokenGenerator(PasswordResetTokenGenerator):
    """
    Custom token generator that includes user's activation status in the hash.
    """
    def _make_hash_value(self, user, timestamp):
        return (
            text_type(user.pk) + text_type(timestamp) +
            text_type(user.is_active)
        )


# Instantiate the custom token generator
account_token = TokenGenerator()


def send_reset_password_email(profile):
    """
    Sends a password reset email to the user.
    """
    # Determine the current domain (ensure Site framework is configured)
    try:
        current_domain = Site.objects.get_current().domain
    except Site.DoesNotExist:
        # Fallback to ALLOWED_HOSTS if Site framework is not configured
        current_domain = settings.ALLOWED_HOSTS[0] if settings.ALLOWED_HOSTS else 'localhost'

    # Create the templated email
    email_template = get_templated_mail(
        template_name='password_reset_email.html',
        from_email=settings.EMAIL_HOST_USER,
        to=[profile.email],
        context={
            'profile': profile,
            'domain': current_domain,
            'uid': urlsafe_base64_encode(force_bytes(profile.id)),
            'token': account_token.make_token(profile),
        },
        template_prefix="emails/",
        template_suffix="html",
    )

    # Send the email
    send_html_mail(email_template)
