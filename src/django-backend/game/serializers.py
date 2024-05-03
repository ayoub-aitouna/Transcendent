from rest_framework import serializers
from .models import Game, Tournament, TournamentsRegisteredPlayers, Brackets

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = '__all__'

class BracketsSerializer(serializers.ModelSerializer):
    player = serializers.StringRelatedField()
    class Meta:
        model = Brackets
        fields = ['player', 'round_number']

class TournamentSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='tournament-detail')
    register = serializers.HyperlinkedIdentityField(view_name='tournament-register')

    class Meta:
        model = Tournament
        fields = ['name', 'description', 'start_date', 'max_players', 'url', 'register']

class TournamentDetailsSerializer(serializers.ModelSerializer):
    registered_users = serializers.StringRelatedField(many=True)
    tournament_bracket = BracketsSerializer(many=True)

    class Meta:
        model = Tournament
        fields = ['name', 'description', 'max_players', 'tournament_bracket', 'start_date', 'registered_users', 'created_at', 'updated_at']

class TournamentsRegisteredPlayersSerializer(serializers.ModelSerializer):
    class Meta:
        model = TournamentsRegisteredPlayers
        fields = '__all__'
    
