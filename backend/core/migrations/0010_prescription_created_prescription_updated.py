# Generated by Django 4.1.5 on 2023-01-18 20:50

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0009_medication_treatment_remove_appointment_note_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='prescription',
            name='created',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='prescription',
            name='updated',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
