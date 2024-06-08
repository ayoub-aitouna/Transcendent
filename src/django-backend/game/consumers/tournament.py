
from channels.generic.websocket import AsyncWebsocketConsumer
import json
import uuid
from channels.db import database_sync_to_async
from game.models import Matchup
from user.models import User


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
