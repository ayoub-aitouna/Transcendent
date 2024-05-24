
from channels.generic.websocket import AsyncWebsocketConsumer
from random import randint
import json
import asyncio
import uuid
import logging

logger = logging.getLogger(__name__)

registered_users = []


class GameLobby(AsyncWebsocketConsumer):
    async def connect(self):
        self.user = self.scope['user']
        if not self.user:
            self.close()
        self.room_group_name = self.get_group_name(self.user.id)
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()
        self.lock = asyncio.Lock()
        await self.matchmaking()

    async def matchmaking(self):
        global registered_users
        async with self.lock:
            compatible_users = [user for user in registered_users if user.current_xp in range(
                user.current_xp - 1000, user.current_xp + 1000)]
            if not compatible_users:
                registered_users.append(self.user)
            else:
                matched_user = compatible_users[0]
                registered_users.remove(matched_user)
                game_started_obj = self.create_game()
                try:
                    await self.channel_layer.group_send(
                        self.get_group_name(matched_user.id), game_started_obj
                    )
                    await self.channel_layer.group_send(
                        self.room_group_name, game_started_obj
                    )
                except Exception as e:
                    print(f'Error: {e}')
                    await self.close()

    async def receive(self, text_data=None, bytes_data=None):
        pass

    async def broadcast(self, event):
        message = event['message']
        await self.send(text_data=json.dumps({
            'message': message
        }))

    def create_game(self):
        game_id = str(uuid.uuid4())
        game_room_url = f"ws://{self.scope['host']}/ws/game/{game_id}/"
        return {
            "type": 'broadcast',
            'message': {
                'game_room_url':  game_room_url,
                'game_id': game_id,
            }
        }

    def get_group_name(self, id):
        return f'game_lobby_group_{id}'

    async def disconnect(self, close_code):
        try:
            registered_users.remove(self.scope['user'])
        except ValueError:
            pass
        await self.channel_layer.group_discard(
            self.room_group_name, self.channel_name
        )


class InGame(AsyncWebsocketConsumer):
    async def connect(self):
        self.user = self.scope['user']
        if not self.user:
            self.close()
        room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f"game_{room_name}"
        await self.channel_layer.group_add(
            self.room_group_name, self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name, self.channel_name
        )

    async def receive(self, text_data=None, bytes_data=None):
        await self.channel_layer.group_send(
            self.room_group_name, {
                "type": 'broadcast',
                'message': text_data
            }
        )

    async def broadcast(self, event):
        message = event['message']
        await self.send(text_data=json.dumps({
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
