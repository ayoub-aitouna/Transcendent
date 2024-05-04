
from channels.generic.websocket import WebsocketConsumer
from django.core.cache import cache
from django.core.cache.backends.redis import RedisCache
from rest_framework import serializers
from user.models import User
from asgiref.sync import async_to_sync
import json
from random import randint
from django.core.cache import cache, caches

registered_users = []

class GameLobby(WebsocketConsumer):
    def connect(self):
        self.user = self.scope['user']
        if not self.user:
            self.close()
        self.room_group_name = self.get_group_name(self.user.id)
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name, self.channel_name
        )
        self.accept()

        compatible_users = [user for user in registered_users if user.current_xp in range(
            user.current_xp - 1000, user.current_xp + 1000)]
        if not compatible_users:
            registered_users.append(self.user)
        else:
            matched_user = compatible_users[0]
            game_started_obj = self.create_game()
            try:
                async_to_sync(self.channel_layer.group_send)(
                    self.get_group_name(matched_user.id), game_started_obj
                )
                async_to_sync(self.channel_layer.group_send)(
                    self.room_group_name, game_started_obj
                )
                registered_users.remove(matched_user)
            except Exception as e:
                print(e)

    def disconnect(self, close_code):
        user = self.scope['user']
        registered_users.remove(user)
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name, self.channel_name
        )

    def receive(self, text_data=None, bytes_data=None):
        pass

    def broadcast(self, event):
        message = event['message']
        self.send(text_data=json.dumps({
            'message': message
        }))

    def create_game(self):
        print('scope \n', self.scope, '\n-----------\n')
        random_game_id = randint(10000, 99999)
        game_room_url = f"ws://{self.scope['host']}/ws/game/{random_game_id}/"
        return {
            "type": 'broadcast',
            'message': {
                'game_room_url':  game_room_url,
                'game_id': random_game_id,
            }
        }

    def get_group_name(self, id):
        return f'game_lobby_group_{id}'

class InGame(WebsocketConsumer):
    def connect(self):
        self.user = self.scope['user']
        if not self.user:
            self.close()
        room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f"game_{room_name}"
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name, self.channel_name
        )
        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name, self.channel_name
        )

    def receive(self, text_data=None, bytes_data=None):
        # text_data_json = json.loads(text_data)
        # message = text_data_json['message']
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name, {
                "type": 'broadcast',
                'message': text_data
            }
        )

    def broadcast(self, event):
        message = event['message']
        self.send(text_data=json.dumps({
            'message': message
        }))

def classification_by_players_xp(xp):
    if xp < 1000:
        return 'Beginner'
    elif xp < 5000:
        return 'Intermediate'
    elif xp < 10000:
        return 'Advanced'
    else:
        return 'Expert'


def preferred_classification_search_order(xp):
    if xp < 1000:
        return ['Beginner', 'Intermediate', 'Advanced', 'Expert']
    elif xp < 5000:
        return ['Intermediate', 'Beginner', 'Advanced', 'Expert']
    elif xp < 10000:
        return ['Advanced', 'Intermediate', 'Beginner', 'Expert']
    else:
        return ['Expert', 'Advanced', 'Intermediate', 'Beginner']