import asyncio
from channels.layers import get_channel_layer
import json
from channels.db import database_sync_to_async
from user.models import User
from game.models import Matchup, Tournament
import random


class TournamentRoutine():
    wating_players = []
    time_in_s = 0
    lock = None
    tournament = None
    current_round = 1

    def __init__(self, uuid) -> None:
        self.uuid = uuid

    @classmethod
    async def create(cls, uuid):
        self = TournamentRoutine(uuid)
        self.lock = asyncio.Lock()
        self.tournament = await database_sync_to_async(Tournament.objects.get)(uuid=uuid)
        asyncio.create_task(self.tournament_loop())

    async def add_player(self, player):
        async with self.lock:
            if player not in self.wating_players:
                self.wating_players.append()

    async def remove_player(self, player):
        async with self.lock:
            self.wating_players.remove(player)

    async def emit_match_info(self, match):
        match_info = {
            'type': 'match_info',
            'match_uuid': str(match.match_uuid),
            'first_player': match.first_player.username,
            'second_player': match.second_player.username
        }
        await self.emit(match_info)

    async def create_matchs(self, players):
        async with self.lock:
            random.shuffle(players)
            # get all current round brackts repuplulate it using the new data
            for i in range(0, len(players), 2):
                if i + 1 < len(players):
                    matchup = Matchup(
                        first_player=players[i],
                        second_player=players[i + 1],
                        tournament=self.tournament,
                        round_number=self.current_round
                    )
                    await database_sync_to_async(matchup.save)()
                    await self.emit_match_info()

    async def create_initial_matches(self):
        async with self.lock:
            players = self.wating_players
            await self.create_matchs(players)

    async def tournament_loop(self):
        while True:
            self.time_in_s += 1
            if len(self.wating_players) == len(self.tournament.registered_users):
                await self.create_initial_matches()
                break
            elif self.time_in_s >= 120:
                if len(self.wating_players) < len(self.tournament.registered_users) / 2:
                    await self.emit(
                        {'status': 'over', 'reason': 'Not Enoght Player Showed Up'})
                else:
                    self.create_initial_matches()
                break
            await asyncio.sleep(1)

    async def handle_match_result(self, match_uuid, winner_id):
        async with self.lock:
            match = await database_sync_to_async(Matchup.objects.get)(game_uuid=match_uuid)
            winner = await database_sync_to_async(User.objects.get)(id=winner_id)
            match.Winner = winner
            match.game_over = True
            await database_sync_to_async(match.save)()
            await self.check_round_complition()

    async def check_round_complition(self):
        async with self.lock:
            current_round_matches = database_sync_to_async(Matchup.objects.filter(
                tournament=self.tournament,
                Winner__isnull=False, game_over=True,
                round_number=self.current_round
            ).count())()

            total_round_matches = database_sync_to_async(Matchup.objects.filter(
                tournament=self.tournament,
                round_number=self.current_round
            ).count())()
            if current_round_matches == total_round_matches:
                await self.prepare_next_round()

    async def prepare_next_round(self):
        async with self.lock:
            self.current_round += 1
            current_round_winners = await database_sync_to_async(
                lambda: list(Matchup.objects.filter(
                    tournament=self.tournament,
                    game_over=True,
                    winner__isnull=False,
                    round_number=self.current_round - 1
                ).values_list('winner', flat=True))
            )()
            if len(current_round_winners) > 1:
                winners = await database_sync_to_async(User.objects.filter(id__in=current_round_winners))
                self.create_matchs(winners)
            else:
                tournament_winner = await database_sync_to_async(User.objects.get(id=current_round_winners[0]))
                await self.emit({'status': 'over', 'winner': tournament_winner.username})

    async def emit(self, dict_data):
        await self.channel_layer.group_send(
            f"tournament_{self.uuid}",
            {
                'type': 'broadcast',
                'message': json.dumps(dict_data)
            }
        )


class TournamentManager():
    lock = None
    tournaments = {}

    def __init__(self) -> None:
        pass

    async def get_lock(self):
        if self.lock is None:
            self.lock = asyncio.Lock()
        return self.lock

    async def get_or_create_tournament(self, uuid):
        print("called get_or_create_game")
        self.lock = await self.get_lock()
        async with self.lock:
            if uuid not in self.tournaments:
                print('create new Game')
                game = await TournamentRoutine.create(uuid)
                self.tournaments[uuid] = game
                asyncio.create_task(game.tournament_loop())
            return self.tournaments[uuid]

    async def remove_game(self, uuid):
        self.lock = await self.get_lock()
        async with self.lock:
            if uuid in self.games:
                del self.games[uuid]
