# Generated by Django 4.1.5 on 2023-02-25 15:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0012_alter_clienthealthstatus_client'),
    ]

    operations = [
        migrations.AddField(
            model_name='appointment',
            name='title',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]