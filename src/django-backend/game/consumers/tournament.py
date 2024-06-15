
from channels.generic.websocket import AsyncWebsocketConsumer
import json
import uuid
from channels.db import database_sync_to_async
from game.models import Matchup
from user.models import User


class TournamentConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user = self.scope['user']
        if self.user is None:
            return await self.close()
        await self.accept()
        self.tournament_id = self.scope['url_route']['kwargs']['tournament_id']
        self.tournament_group_name = f'tournament_{self.tournament_id}'
        self.tournament_manager = self.scope['url_route']['kwargs']['tournament_manager']
        self.tournament_routine = await self.tournament_manager.get_or_create_tournament(self.tournament_id)
        if self.tournament_routine is None:
            print('Tournament not found')
            return await self.close(4004, 'Tournament not found')
        await self.channel_layer.group_add(
            self.tournament_group_name,
            self.channel_name
        )
        await self.tournament_routine.add_player(self.user)

    async def disconnect(self, close_code):
        if self.tournament_routine is None:
            return
        lastPlayer = await self.tournament_routine.remove_player(self.user)
        if lastPlayer:
            await self.tournament_manager.remove_tournament(self.tournament_id)
        await self.channel_layer.group_discard(
            self.tournament_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        try:
            JsonData = json.loads(text_data)
        except json.JSONDecodeError:
            return await self.send(text_data=json.dumps({'error': 'Invalid JSON'}))
        print(f'JsonData is \n{JsonData}')
        return

    async def match_result(self, event):
        await self.tournament_routine.check_round_completion()

    async def broadcast(self, event):
        message = event['message']
        await self.send(text_data=message)
        try:
            status = message['status']
            if status == 'over':
                await self.close()
        except:
            return
