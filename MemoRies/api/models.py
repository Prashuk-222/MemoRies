import uuid
import datetime
from django.db import models
from django.utils.translation import gettext_lazy as _


from accounts.models import ProfileUser


class Note(models.Model):
    """
    Represents a Note entity, associated with a user and containing a body, updated date, and unique identifier.
    """
    owner = models.ForeignKey(
        ProfileUser,
        on_delete=models.CASCADE,
        related_name='notes',
        verbose_name=_('Owner')
    )
    title = models.CharField(
        _('Title'),
        max_length=255,
        default="Default title"
    )
    content = models.TextField(
        _('Content'),
        max_length=6000,
        default="Default body content"
    )
    created_at = models.DateField(
        _('Created At'),
        default=datetime.date.today
    )
    updated_at = models.DateField(
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
        ordering = ('-updated_at',)
        verbose_name = _('Note')
        verbose_name_plural = _('Notes')

    def __str__(self):
        return self.content[:50]
