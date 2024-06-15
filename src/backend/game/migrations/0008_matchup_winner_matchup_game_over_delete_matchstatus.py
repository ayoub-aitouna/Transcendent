# Generated by Django 4.2.13 on 2024-05-18 23:25

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('game', '0007_tournament_icon'),
    ]

    operations = [
        migrations.AddField(
            model_name='matchup',
            name='Winner',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='winner', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='matchup',
            name='game_over',
            field=models.BooleanField(default=False),
        ),
        migrations.DeleteModel(
            name='MatchStatus',
        ),
    ]