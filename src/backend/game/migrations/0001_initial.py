# Generated by Django 5.0.4 on 2024-05-02 03:02

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Game',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('description', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Tournament',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('description', models.TextField()),
                ('max_players', models.IntegerField(default=16)),
                ('start_date', models.DateTimeField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Matchup',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('first_player', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='first_player', to=settings.AUTH_USER_MODEL)),
                ('game', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='game', to='game.game')),
                ('second_player', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='second_player', to=settings.AUTH_USER_MODEL)),
                ('tournament', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='tournament_match_up', to='game.tournament')),
            ],
        ),
        migrations.CreateModel(
            name='MatchStatus',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_player_score', models.IntegerField(default=0)),
                ('second_player_score', models.IntegerField(default=0)),
                ('game_over', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('Winner', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='winner', to=settings.AUTH_USER_MODEL)),
                ('matchup', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='matchup', to='game.matchup')),
            ],
        ),
        migrations.CreateModel(
            name='Brackets',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('round_number', models.IntegerField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('tournament', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='tournament_bracket', to='game.tournament')),
            ],
        ),
        migrations.CreateModel(
            name='TurnementsRegistredPlayers',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('tournament', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tournament', to='game.tournament')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tournament_player', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='tournament',
            name='registred_users',
            field=models.ManyToManyField(through='game.TurnementsRegistredPlayers', to=settings.AUTH_USER_MODEL),
        ),
    ]
