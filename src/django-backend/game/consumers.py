
from channels.generic.websocket import AsyncWebsocketConsumer
import json
import uuid
from channels.db import database_sync_to_async
from .models import Matchup
from user.models import User


class GameLobby(AsyncWebsocketConsumer):

    async def connect(self):
        self.user = self.scope['user']
        if not self.user:
            self.close()
        self.match_maker = self.scope['url_route']['kwargs']['match_maker']
        self.room_group_name = self.get_group_name(self.user.id)
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()
        await self.matchmaking()

    async def matchmaking(self):
        match_user = await self.match_maker.get_match_users(self.user)
        if match_user:
            game_started_obj = await self.create_game(match_user)
            await self.channel_layer.group_send(
                self.get_group_name(match_user.id), game_started_obj
            )
            await self.channel_layer.group_send(
                self.room_group_name, game_started_obj
            )

    async def receive(self, text_data=None, bytes_data=None):
        pass

    async def broadcast(self, event):
        message = event['message']
        await self.send(text_data=json.dumps({
            'message': message
        }))

    async def create_game(self, matched_user):
        game_uuid = str(uuid.uuid4())
        await self.create_match(game_uuid, self.user, matched_user)
        return {
            "type": 'broadcast',
            'message': {
                'game_uuid': game_uuid,
            }
        }

    def get_group_name(self, id):
        return f'game_lobby_group_{id}'

    @database_sync_to_async
    def create_match(self, uuid, first_player, second_player):
        return Matchup.objects.create(game_uuid=uuid, first_player=first_player, second_player=second_player)

    async def disconnect(self, close_code):
        try:
            self.match_maker.remove_user(self.user)
        except ValueError:
            pass
        await self.channel_layer.group_discard(
            self.room_group_name, self.channel_name
        )


class InGame(AsyncWebsocketConsumer):

    async def connect(self):
        self.user = self.scope['user']
        if not self.user:
            await self.close(reason='User not authenticated', code=400)
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.game_manager = self.scope['url_route']['kwargs']['game_manager']
        self.game = await self.game_manager.get_or_create_game(self.room_name)
        await self.game.add_player(self.user)
        self.room_group_name = f"game_{self.room_name}"
        await self.channel_layer.group_add(
            self.room_group_name, self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        print('User Disconnected')
        if await self.game.remove_player(self.user):
            print(
                f'No player left in the game. Removing game. {self.room_name}')
            await self.game_manager.remove_game(self.room_name)
        await self.channel_layer.group_discard(
            self.room_group_name, self.channel_name
        )

    async def receive(self, text_data=None, bytes_data=None):
        try:
            data = json.loads(text_data)
            message_type = data.get('type')
            if message_type == 'move':
                await self.game.move_paddle(self.user, data['y'])
        except Exception as e:
            print(f'Failed to convert data into JSON: {e}')

    async def broadcast(self, event):
        await self.send(text_data=event['message'])


class TournamentConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.tournament_id = self.scope['url_route']['kwargs']['tournament_id']
        self.tournament_group_name = f'tournament_{self.tournament_id}'
        self.tournament_manager = self.scope['url_route']['kwargs']['tournament_manager']
        self.tournament = await self.tournament_manager.get_or_create_tournament(self.room_name)
        await self.channel_layer.group_add(
            self.tournament_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.tournament_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message_type = text_data_json['type']

        if message_type == 'register_player':
            player_id = text_data_json['player_id']
            player = await database_sync_to_async(User.objects.get)(id=player_id)
            await self.tournament_routine.add_player(player)

        elif message_type == 'match_result':
            match_id = text_data_json['match_id']
            winner_id = text_data_json['winner_id']
            await self.tournament_routine.handle_match_result(match_id, winner_id)

    async def broadcast(self, event):
        message = event['message']
        await self.send(text_data=message)
