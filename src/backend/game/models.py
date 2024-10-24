from typing import Iterable
from django.db import models
from user.models import User
import uuid


class Game(models.Model):
    name = models.CharField(max_length=200, blank=False, null=False)
    description = models.TextField(blank=False, null=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Tournament(models.Model):
    icon = models.URLField(blank=True, null=True)
    name = models.CharField(max_length=200, blank=False, null=False)
    description = models.TextField(blank=False, null=False)
    max_players = models.IntegerField(default=16)
    start_date = models.DateTimeField(null=False, blank=False)
    registered_users = models.ManyToManyField(
        User, through='TournamentsRegisteredPlayers')
    streams = models.ManyToManyField('stream', blank=True)
    is_public = models.BooleanField(default=False)
    is_monetized = models.BooleanField(default=False)
    owner = models.ForeignKey('user.User', on_delete=models.CASCADE,
                              related_name='owner')
    uuid = models.CharField(max_length=200, blank=False,
                            null=False, default=uuid.uuid4)
    finished = models.BooleanField(default=False)
    ongoing = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def registered_players(self):
        return self.registered_users.all()

    def get_registered_players_count(self):
        return self.registered_users.count()

    def get_brackets(self):
        return self.tournament_bracket.all()

    def __str__(self):
        return self.name


class stream(models.Model):
    stream_url = models.URLField()
    player1 = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='streaming_player1')
    player2 = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='streaming_player2')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class TournamentsRegisteredPlayers(models.Model):
    tournament = models.ForeignKey(
        Tournament, on_delete=models.CASCADE, related_name='tournament')
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='tournament_player')
    alias = models.CharField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.alias:
            self.alias = self.user.username
        return super().save(*args, **kwargs)


class GamePlayer(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='game_user', null=True)
    score = models.IntegerField(null=False, default=0)
    alias = models.CharField(null=False)

    def save(self, *args, **kwargs):
        if not self.alias:
            self.alias = self.user.username if self.user else 'root'
        return super().save(*args, **kwargs)


class Matchup(models.Model):
    game_type_choice = [
        ('online', 'Online'),
        ('offline', 'Offline')
    ]
    first_player = models.ForeignKey(
        GamePlayer, on_delete=models.CASCADE, related_name='first_player')
    second_player = models.ForeignKey(
        GamePlayer, on_delete=models.CASCADE, related_name='second_player', null=True)
    tournament = models.ForeignKey(
        Tournament, on_delete=models.CASCADE, related_name='tournament_match_up', null=True)
    Winner = models.ForeignKey(
        GamePlayer, on_delete=models.CASCADE, related_name='winner', null=True)
    game_over = models.BooleanField(default=False)
    game_uuid = models.CharField(
        max_length=200, blank=False, null=False, unique=True, default=uuid.uuid4)
    round_number = models.IntegerField(default=1)
    game_type = models.CharField(
        choices=game_type_choice, default='online')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Brackets(models.Model):
    tournament = models.ForeignKey(
        Tournament, on_delete=models.CASCADE, related_name='tournament_bracket',
        null=False, default=None)
    round_number = models.IntegerField(null=False, default=1)
    player = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='player', null=False, default=None)
    alias = models.CharField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.alias:
            self.alias = self.player.username
        return super().save(*args, **kwargs)
