import asyncio
import math
from channels.layers import get_channel_layer
import json
from channels.db import database_sync_to_async
from user.models import User
from .models import Matchup


class Ball():
    RADIUS = 5
    SPEED = 5

    def __init__(self, width, height):
        self.width = width
        self.height = height
        self.radius = Ball.RADIUS
        self.reset()

    def setAngle(self, angle):
        self.angle = angle
        self.dx = self.speed * math.cos(self.angle)
        self.dy = self.speed * math.sin(self.angle)

    def reset(self):
        self.x = self.width / 2
        self.y = self.height / 2
        self.speed = Ball.SPEED
        self.setAngle(0)

    def update(self, callback):
        self.x += self.dx
        self.y += self.dy

        # Collision with the left paddle
        if (self.x - self.radius < self.leftPaddle.x + self.leftPaddle.WIDTH / 2 and
                self.leftPaddle.is_on_same_level(self)):
            self.setAngle(self.leftPaddle.get_hit_angle(self))
            # self.dx *= -1

        # Collision with the right paddle
        if (self.x + self.radius > self.rightPaddle.x - self.rightPaddle.WIDTH / 2 and
                self.rightPaddle.is_on_same_level(self)):
            self.setAngle(self.rightPaddle.get_hit_angle(self))
            self.dx *= -1

        # Collision with the top or bottom wall
        if self.y - self.radius < 0 or self.y + self.radius > self.height:
            self.dy *= -1

        # Ball out of bounds (left or right)
        if self.x - self.radius < 0 or self.x + self.radius > self.width:
            self.reset()
            callback()

    def setPaddles(self, leftPaddle, rightPaddle):
        self.leftPaddle = leftPaddle
        self.rightPaddle = rightPaddle


class Paddle():
    HEIGHT = 60
    WIDTH = 10

    def __init__(self, x, y):
        self.x = x
        self.y = y

    def updatePosition(self, y):
        self.y = y

    def get_hit_angle(self, ball):
        diff = ball.y - self.y
        return map_value(diff, -Paddle.HEIGHT / 2, Paddle.HEIGHT / 2, -math.pi / 4, math.pi / 4)

    def is_on_same_level(self, ball):
        return self.y - Paddle.HEIGHT / 2 <= ball.y <= self.y + Paddle.HEIGHT / 2


class Game():
    WIDTH = 800
    HEIGHT = 600

    def __init__(self, room_id):
        self.room_id = room_id
        self.is_running = True
        self.players = []
        self.ball = Ball(Game.WIDTH, Game.HEIGHT)
        self.player_1_paddle = Paddle(
            10,  (Game.HEIGHT / 2) - Paddle.HEIGHT / 2)
        self.player_2_paddle = Paddle(
            Game.WIDTH - 20, (Game.HEIGHT / 2) - Paddle.HEIGHT / 2)
        self.ball.setPaddles(self.player_1_paddle, self.player_2_paddle)
        self.channel_layer = get_channel_layer()
        self.pause = False
        self.waiting_in_ms = 0

    @classmethod
    async def create(cls, room_id):
        self = cls(room_id)
        self.lock = asyncio.Lock()
        try:
            self.matchup = await database_sync_to_async(Matchup.objects.get)(game_uuid=room_id)
        except Matchup.DoesNotExist:
            self.matchup = None
        return self

    async def add_player(self, player):
        async with self.lock:
            if len(self.players) == 2 or player in self.players or not self.matchup:
                return False
            if player == self.matchup.first_player or player == self.matchup.second_Player:
                self.players.append(player)
            return True

    async def move_paddle(self, player, y):
        async with self.lock:
            # if player == self.matchup.first_player else self.player_2_paddle
            paddle = self.player_1_paddle
            paddle.updatePosition(y=y)

    async def remove_player(self, player):
        async with self.lock:
            if player in self.players:
                player.remove(player)
            return len(self.players) == 0

    async def game_loop(self):
        while self.is_running:
            await asyncio.sleep(1/60)
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
            if self.pause:
                self.waiting_in_ms += 16
                if self.waiting_in_ms >= 1 * 1000:
                    self.pause = False
                continue
            self.waiting_in_ms = 0
            self.ball.update(lambda: self.new_point())
            await self.emit({
                'type': 'update',
                'ball': {
                    'x': self.ball.x,
                    'y': self.ball.y
                },
                'leftPaddle': {
                    'x': self.player_1_paddle.x,
                    'y': self.player_1_paddle.y
                },
                'rightPaddle': {
                    'x': self.player_2_paddle.x,
                    'y': self.player_2_paddle.y
                }

            })

    async def emit(self, dict_data):
        await self.channel_layer.group_send(
            f"game_{self.room_id}",
            {
                'type': 'broadcast',
                'message': json.dumps(dict_data)
            }
        )

    def new_point(self):
        self.pause = True
        self.player_1_paddle.updatePosition(
            (Game.HEIGHT / 2) - Paddle.HEIGHT / 2)
        self.player_2_paddle.updatePosition(
            (Game.HEIGHT / 2) - Paddle.HEIGHT / 2)

    async def handle_goal_declaration(self, data):
        pause = True
        try:
            if self.user == self.match.first_player:
                self.match.first_player_score += 1
            elif self.user == self.match.second_player:
                self.match.second_player_score += 1
            winner = self.determine_winner()
            if winner:
                self.match.Winner = winner
                self.match.game_over = True
                data['winner'] = winner.username
                data['game_over'] = True
            await database_sync_to_async(self.match.save)()
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

    async def cleanup(self):
        self.is_running = False


class GameManager():
    def __init__(self):
        self.games = {}
        self.lock = None

    async def get_lock(self):
        if self.lock is None:
            self.lock = asyncio.Lock()
        return self.lock

    async def get_or_create_game(self, room_id):
        print(f"called get_or_create_game {room_id}")
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
                await self.games[room_id].cleanup()
                del self.games[room_id]


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
