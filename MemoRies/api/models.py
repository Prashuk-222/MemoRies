from django.db import models
from accounts.models import CustomUser 
from django.contrib.auth.models import AbstractUser

class Note(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='notes')
    title = models.CharField(max_length=255)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
