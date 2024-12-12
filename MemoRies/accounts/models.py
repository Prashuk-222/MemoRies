import uuid
import datetime
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.core.validators import validate_email
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.utils import timezone

class MyAccountManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifier
    for authentication instead of username.
    """
    def create_user(self, email, first_name, password=None, is_active=True):
        """
        Create and save a User with the given email, first name, and password.
        """
        if not email:
            raise ValueError("User must have an email address.")
        if not first_name:
            raise ValueError("User must have a first name.")

        user = self.model(
            email=self.normalize_email(email),
            first_name=first_name,
        )
        user.is_active = is_active  # Default value is active, unless specified
        user.set_password(password)  # Hash the password
        user.save(using=self._db)
        return user

    def create_superuser(self, email, first_name, password):
        """
        Create and return a superuser with given email, first name, and password.
        """
        if password is None:
            raise TypeError('Superuser must have a password.')

        user = self.create_user(
            email=self.normalize_email(email),
            first_name=first_name,
            password=password,
            is_active=True  # Superuser should be active by default
        )
        user.is_staff = True  # Superuser has staff privileges
        user.is_superuser = True  # Superuser flag set to True
        user.save(using=self._db)
        return user


class ProfileUser(AbstractBaseUser, PermissionsMixin):
    """
    Custom user model where email is used for authentication instead of username.
    """
    first_name = models.CharField(_('First Name'), max_length=150)
    email = models.EmailField(
        _('Email'),
        max_length=255,
        unique=True,
        validators=[validate_email],
    )
    is_active = models.BooleanField(
        _('Active'),
        default=True,
        help_text=_('Designates whether this user should be treated as active. '
                    'Unselect this instead of deleting accounts.')
    )
    is_staff = models.BooleanField(
        _('staff status'),
        default=False,
        help_text=_('Designates whether the user can log into this admin site.')
    )

    id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)
    date_joined = models.DateTimeField(_('Date Joined'), default=timezone.now)

    objects = MyAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name']

    def __str__(self):
        return self.first_name
