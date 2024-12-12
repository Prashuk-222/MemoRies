# Generated by Django 5.1.2 on 2024-11-17 12:23

import datetime
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_note_options_rename_user_note_owner_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='note',
            options={'ordering': ('-updated',), 'verbose_name': 'Note', 'verbose_name_plural': 'Notes'},
        ),
        migrations.AlterField(
            model_name='note',
            name='body',
            field=models.TextField(default='Default body content', max_length=6000, verbose_name='Body'),
        ),
        migrations.AlterField(
            model_name='note',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='notes', to=settings.AUTH_USER_MODEL, verbose_name='Owner'),
        ),
        migrations.AlterField(
            model_name='note',
            name='updated',
            field=models.DateField(default=datetime.date.today, verbose_name='Last Updated'),
        ),
    ]
