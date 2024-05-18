import os
from django.conf import settings
from rest_framework import serializers
from .models import Game, Tournament, TournamentsRegisteredPlayers, Brackets, stream
from user.serializers import UserSerializer
from django.core.files.storage import default_storage


class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = '__all__'


class BracketsSerializer(serializers.ModelSerializer):
    player = UserSerializer()

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
    icon = serializers.SerializerMethodField(read_only=True)
    icon_file = serializers.FileField(write_only=True)

    class Meta:
        model = Tournament
        fields = ['id', 'icon', 'icon_file', 'name', 'description', 'start_date',
                  'max_players', 'url', 'register']

    def get_icon(self, obj):
        if obj.icon is None:
            return None
        request = self.context.get("request")
        host = request.get_host()
        protocol = 'https' if request.is_secure() else 'http'
        return f'{protocol}://{host}{obj.icon}'

    def create(self, validated_data):
        print(f'validate data >>> {validated_data}\n-----\n')
        icon = validated_data['icon_file']
        save_path = os.path.join(
            settings.MEDIA_ROOT, 'public/profile-images', icon.name)
        path = default_storage.save(save_path, icon)
        validated_data['icon'] = f'/media/{path}'
        del validated_data['icon_file']
        return super().create(validated_data)


class TournamentDetailsSerializer(serializers.ModelSerializer):
    registered_users = UserSerializer(many=True)
    tournament_bracket = BracketsSerializer(many=True)
    streams = StreamsSerializer(many=True)
    icon = serializers.SerializerMethodField()

    class Meta:
        model = Tournament
        fields = ['id', 'icon', 'name', 'description', 'max_players', 'is_public', 'is_monetized', 'tournament_bracket',
                  'start_date', 'registered_users', 'streams', 'created_at', 'updated_at']

    def get_icon(self, obj):
        if obj.icon is None:
            return None
        request = self.context.get("request")
        host = request.get_host()
        protocol = 'https' if request.is_secure() else 'http'
        return f'{protocol}://{host}{obj.icon}'


class TournamentsRegisteredPlayersSerializer(serializers.ModelSerializer):
    class Meta:
        model = TournamentsRegisteredPlayers
        fields = '__all__'
