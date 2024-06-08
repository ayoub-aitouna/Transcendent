# Generated by Django 4.2.13 on 2024-06-03 03:36

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('game', '0011_remove_tournament_owener_tournament_owner'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='matchup',
            name='game',
        ),
        migrations.AddField(
            model_name='matchup',
            name='game_uuid',
            field=models.CharField(default=0, max_length=200),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='matchup',
            name='first_player',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='first_player', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='matchup',
            name='second_player',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='second_player', to=settings.AUTH_USER_MODEL),
        ),
    ]