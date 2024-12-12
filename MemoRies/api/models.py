import uuid
import datetime
from django.db import models
from django.utils.translation import gettext_lazy as _

# Replace with settings.AUTH_USER_MODEL if using Django's user abstraction
from accounts.models import ProfileUser

class Note(models.Model):
    """
    Represents a Note entity, associated with a user and containing a body, updated date, and unique identifier.
    """
    owner = models.ForeignKey(
        ProfileUser,  # Use settings.AUTH_USER_MODEL if applicable
        on_delete=models.CASCADE,
        related_name='notes',
        verbose_name=_('Owner')
    )
    body = models.TextField(
        _('Body'),
        max_length=6000,
        default="Default body content"
    )
    updated = models.DateField(
        _('Last Updated'),
        default=datetime.date.today
    )
    id = models.UUIDField(
        default=uuid.uuid4,
        unique=True,
        primary_key=True,
        editable=False
    )
    class Meta:
        ordering = ('-updated',)
        verbose_name = _('Note')
        verbose_name_plural = _('Notes')

    def __str__(self):
        return self.body[:50]  # Truncate the body for cleaner display
