# Generated by Django 5.1.2 on 2024-12-15 12:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_note_options_alter_note_body_alter_note_owner_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='note',
            old_name='body',
            new_name='content',
        ),
        migrations.AddField(
            model_name='note',
            name='title',
            field=models.CharField(default='Default title', max_length=255, verbose_name='Title'),
        ),
    ]
