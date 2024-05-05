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
    registered_users = models.ManyToManyField(User, through='TournamentsRegisteredPlayers')

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
    


class TournamentsRegisteredPlayers(models.Model):
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE, related_name='tournament')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tournament_player')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Matchup(models.Model):
    game = models.ForeignKey(Game, on_delete=models.CASCADE, related_name='game')
    first_player = models.ForeignKey(User, on_delete=models.CASCADE, related_name='first_player')
    second_player = models.ForeignKey(User, on_delete=models.CASCADE, related_name='second_player')
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE, related_name='tournament_match_up', null=True)

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
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE, related_name='tournament_bracket', null=False, default=None)
    round_number = models.IntegerField(null=False, default=1)
    player = models.ForeignKey(User, on_delete=models.CASCADE, related_name='player', null=False, default=None)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)