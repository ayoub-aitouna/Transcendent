from django.db import models
from user.models import User

class Game(models.Model):
    name = models.CharField(max_length=200, blank=False, null=False)
    description = models.TextField(blank=False, null=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Tournament(models.Model):
    name = models.CharField(max_length=200, blank=False, null=False)
    description = models.TextField(blank=False, null=False)
    max_players = models.IntegerField(default=16)
    start_date = models.DateTimeField(null=False, blank=False) 
    registred_users = models.ManyToManyField(User, on_delete=models.CASCADE, through='TurnementsRegistredPlayers')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class TurnementsRegistredPlayers(models.Model):
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE, related_name='tournament')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Matchup(models.Model):
    game = models.ForeignKey(Game, on_delete=models.CASCADE, related_name='game')
    first_player = models.ForeignKey(User, on_delete=models.CASCADE, related_name='first_player')
    second_player = models.ForeignKey(User, on_delete=models.CASCADE, related_name='second_player')
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE, related_name='tournament', null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class MatchStatus(models.Model):
    Winner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='winner', null=True)
    matchup = models.ForeignKey(Matchup, on_delete=models.CASCADE, related_name='matchup')
    first_player_score = models.IntegerField(null=False, default=0)
    second_player_score = models.IntegerField(null=False, default=0)
    game_over = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Brackets(models.Model):
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE, related_name='tournament', null=True)
    round_number = models.IntegerField(null=False)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
