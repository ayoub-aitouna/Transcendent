import asyncio
import math
from channels.layers import get_channel_layer
import json
from channels.db import database_sync_to_async
from user.models import User
from .models import Matchup


class Ball():
    width = -1
    height = -1
    radius = 5

    def __init__(self, width, height, dx, dy):
        self.width = width
        self.height = height
        self.x = width / 2
        self.y = height / 2
        self.dx = dx
        self.dy = dy
        self.speed = 5

    def setAngle(self, angle):
        self.angle = math.radians(angle)
        self.dx = self.speed * math.cos(angle)
        self.dy = self.speed * math.sin(angle)

    def reset(self):
        self.x = 0
        self.y = 0
        self.dx = 5
        self.dy = 5

    def update(self):
        self.x += self.dx
        self.y += self.dy
        if self.y - self.radius < 0 or self.y + self.radius > self.height:
            self.dy *= -1
        if self.x - self.radius < 0 or self.x + self.radius > self.width:
            self.dx *= -1

    def does_collide(self, paddle, is_left) -> bool:
        is_level = self.y > paddle.y - paddle.height/2\
            and self.y < paddle.y + paddle.height / 2
        if not is_level:
            return False
        if is_left:
            return self.x - self.radius < paddle.x + paddle.width / 2
        return self.x + self.radius > paddle.x - paddle.width / 2


class Paddle():
    def __init__(self, x, y) -> None:
        self.height = 10
        self.width = 5
        self.x = x
        self.y = y

    def updatePosition(self, x, y):
        self.x = x
        self.y = y

    def get_hit_angle(self, ball):
        diff = ball.y - self.y
        return map_value(diff, -self.height / 2, self.height / 2,
                         -math.pi / 4, math.pi / 4)


class Game():
    width = 800
    height = 600
    paddle_width = 10
    paddle_height = 60
    paddle_speed = 5
    channel_layer = get_channel_layer()
    waiting_in_ms = 0

    def __init__(self, room_id):
        self.room_id = room_id
        self.players = []
        self.ball = Ball(self.width, self.height, 5, 5)
        self.player_1_paddle = Paddle(30, self.height / 2)
        self.player_2_paddle = Paddle(self.width - 30, self.height / 2)

    @classmethod
    async def create(cls, room_id):
        self = Game(room_id)
        self.lock = asyncio.Lock()
        self.matchup = await self.get_match(self.room_id)
        return self

    async def add_player(self, player):
        async with self.lock:
            if len(self.players) == 2 or player in self.players or not self.matchup:
                return False
            if player == self.matchup.first_player or player == self.matchup.second_Player:
                self.players.append(player)
            return True

    async def remove_player(self, player):
        return True
        async with self.lock:
            if player in self.players:
                player.remove(player)
            return len(self.players) == 0

    async def game_loop(self):
        while True:
            # if len(self.players) != 2:
            #     self.waiting_in_ms += 16
            #     if self.waiting_in_ms >= 20 * 1000:
            #         # update db and set game as over
            #         await self.emit({
            #             'game_over': True,
            #             'reason': 'player did not not register'
            #         })
            #         return
            #     continue

            self.ball.update()
            if self.ball.does_collide(self.player_1_paddle, True):
                self.ball.setAngle(
                    self.player_1_paddle.get_hit_angle(self.ball))
            if self.ball.does_collide(self.player_2_paddle, False):
                self.ball.setAngle(
                    self.player_2_paddle.get_hit_angle(self.ball))
            await self.emit({
                'x': self.ball.x,
                'y': self.ball.y
            })
            await asyncio.sleep(1/60)

    async def emit(self, dict_data):
        await self.channel_layer.group_send(
            f"game_{self.room_id}",
            {
                'type': 'broadcast',
                'message': json.dumps(dict_data)
            }
        )

    async def handle_goal_declaration(self, data):
        try:
            if self.user == self.match.first_player:
                await self.update_match(
                    player1_score=self.match.first_player_score + 1)
            elif self.user == self.match.second_player:
                await self.update_match(
                    player2_score=self.match.second_player_score + 1)
            winner = self.determine_winner()
            if winner:
                await self.update_match(winner=winner)
                data['winner'] = winner.username
                data['game_over'] = True
            await self.emit(data)
        except:
            print('failed to handle goal declaration')

    def determine_winner(self):
        if self.match.first_player_score >= 15 and self.match.first_player_score - self.match.second_player_score >= 2:
            return self.match.first_player
        elif self.match.second_player_score >= 15 and self.match.second_player_score - self.match.first_player_score >= 2:
            return self.match.second_player
        if self.match.first_player_score >= 20 and self.match.first_player_score > self.match.second_player_score:
            return self.match.first_player
        elif self.match.second_player_score >= 20 and self.match.second_player_score > self.match.first_player_score:
            return self.match.second_player
        return None

    @database_sync_to_async
    def get_match(self, uuid):
        try:
            return Matchup.objects.get(game_uuid=uuid)
        except Matchup.DoesNotExist:
            return None

    @database_sync_to_async
    def update_match(self, player1_score=None, player2_score=None, winner=None):
        if player1_score:
            self.match.first_player_score = player1_score
        if player2_score:
            self.match.second_player_score = player2_score
        if winner:
            self.match.Winner = winner
            self.match.game_over = True
        self.match.save()
        return


class GameManager():
    def __init__(self):
        self.games = {}
        self.lock = None

    async def get_lock(self):
        if self.lock is None:
            self.lock = asyncio.Lock()
        return self.lock

    async def get_or_create_game(self, room_id):
        print("called get_or_create_game")
        self.lock = await self.get_lock()
        async with self.lock:
            if room_id not in self.games:
                print('create new Game')
                game = await Game.create(room_id)
                self.games[room_id] = game
                asyncio.create_task(game.game_loop())
            return self.games[room_id]

    async def remove_game(self, room_id):
        self.lock = await self.get_lock()
        async with self.lock:
            if room_id in self.games:
                del self.games[room_id]

    def __str__(self) -> str:
        return "GameManager"


class MatchMaker():
    def __init__(self):
        self.registered_users = []
        self.lock = None

    async def get_lock(self):
        if self.lock is None:
            self.lock = asyncio.Lock()
        return self.lock

    async def remove_user(self, user):
        self.lock = await self.get_lock()
        async with self.lock:
            self.registered_users.remove(user)

    async def get_match_users(self, user):
        self.lock = await self.get_lock()
        async with self.lock:
            compatible_users = [user for user in self.registered_users if user.current_xp in range(
                user.current_xp - 1000, user.current_xp + 1000)]
            if not compatible_users:
                self.registered_users.append(user)
            else:
                matched_user = compatible_users[0]
                self.registered_users.remove(matched_user)
                return matched_user
        return None


def map_value(val, start_src, end_src, start_dst, end_dst):
    src_span = end_src - start_src
    dst_span = end_dst - start_dst

    valueScaled = float(val - start_src) / float(src_span)
    return start_dst + (valueScaled * dst_span)
