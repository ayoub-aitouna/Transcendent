from rest_framework import serializers
from .models import Game, Tournament, TournamentsRegisteredPlayers, Brackets, stream
from user.serializers import UserSerializer


class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = '__all__'


class BracketsSerializer(serializers.ModelSerializer):
    player = serializers.StringRelatedField()

    class Meta:
        model = Brackets
        fields = ['player', 'round_number']


class StreamsSerializer(serializers.ModelSerializer):
    player1 = UserSerializer()
    player2 = UserSerializer()

    class Meta:
        model = stream
        fields = ['stream_url', 'player1', 'player2']


class TournamentSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='tournament-detail')
    register = serializers.HyperlinkedIdentityField(
        view_name='tournament-register')

    class Meta:
        model = Tournament
        fields = ['name', 'description', 'start_date',
                  'max_players', 'url', 'register']


class TournamentDetailsSerializer(serializers.ModelSerializer):
    registered_users = serializers.StringRelatedField(many=True)
    tournament_bracket = BracketsSerializer(many=True)
    streams = StreamsSerializer(many=True)

    class Meta:
        model = Tournament
        fields = ['name', 'description', 'max_players','is_public','is_monetized', 'tournament_bracket',
                  'start_date', 'registered_users', 'streams', 'created_at', 'updated_at']


class TournamentsRegisteredPlayersSerializer(serializers.ModelSerializer):
    class Meta:
        model = TournamentsRegisteredPlayers
        fields = '__all__'
