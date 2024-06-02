
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
        self.class_record = {}
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name, self.channel_name
        )

    async def receive(self, text_data=None, bytes_data=None):
        try:
            data = json.loads(text_data)
            message_type = data.get('type')
            if message_type == 'position':
                await self.handle_position(data)
            elif message_type == 'goal_declaration':
                await self.handle_goal_declaration(data)
            else:
                print('Unknown message type:', message_type)
           
            # if len(self.class_record) != 0:
            #     print(f"\n-------------------\n{self.class_record['test']}\n-------------------\n")
            # else:
            #     self.class_record['test'] = 3
            #     print('\n-------------------\n set class record \n-------------------\n')
        except:
            print('failed to convert data into json')
    
    async def handle_goal_declaration(self, data):
        "handle goal declaration, winner declars the goal and get set in db "
        "tjem"
        await self.channel_layer.group_send(
            self.room_group_name, 
            {
                "type": 'broadcast',
                'message': data
            }
        )
    async def handle_position(self, data):
        "Handle player position update"
        await self.channel_layer.group_send(
            self.room_group_name, 
            {
                "type": 'broadcast',
                'message': data
            }
        )

    async def broadcast(self, event):
        message = event['message']
        await self.send(text_data=json.dumps({
            'message': message
        }))


class Toutnament(AsyncWebsocketConsumer):
    async def connect(self):
        return await super().connect()

    async def receive(self, text_data=None, bytes_data=None):
        return await super().receive(text_data, bytes_data)

    async def disconnect(self, code):
        return await super().disconnect(code)
