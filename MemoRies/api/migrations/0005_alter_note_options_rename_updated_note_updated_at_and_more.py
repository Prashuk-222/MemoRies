# Generated by Django 5.1.2 on 2024-12-15 20:58

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_rename_body_note_content_note_title'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='note',
            options={'ordering': ('-updated_at',), 'verbose_name': 'Note', 'verbose_name_plural': 'Notes'},
        ),
        migrations.RenameField(
            model_name='note',
            old_name='updated',
            new_name='updated_at',
        ),
        migrations.AddField(
            model_name='note',
            name='created_at',
            field=models.DateField(default=datetime.date.today, verbose_name='Created At'),
        ),
        migrations.AlterField(
            model_name='note',
            name='content',
            field=models.TextField(default='Default body content', max_length=6000, verbose_name='Content'),
        ),
    ]
