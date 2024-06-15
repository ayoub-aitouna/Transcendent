# Generated by Django 4.2.13 on 2024-06-12 16:03

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('game', '0017_tournament_finished'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tournament',
            name='uuid',
            field=models.CharField(default=uuid.uuid4, max_length=200),
        ),
    ]