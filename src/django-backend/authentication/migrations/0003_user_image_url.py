# Generated by Django 5.0.4 on 2024-04-14 12:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0002_alter_user_managers'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='image_url',
            field=models.URLField(blank=True, null=True),
        ),
    ]
