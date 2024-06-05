from django.urls import include, re_path
from . import consumers
from .GameManager import GameManager, MatchMaker
game_manager = GameManager()
match_maker = MatchMaker()

ws_urlpatterns = [
    re_path(r'ws/game/normal/looby/', consumers.GameLobby.as_asgi(), {
        'match_maker': match_maker,
    }),
    re_path(r'ws/game/(?P<room_name>\w+)/$', consumers.InGame.as_asgi(), {
        'game_manager': game_manager
    }),
    re_path(r'ws/game/tournament/(?P<tournament_id>\w+)/$',
            consumers.Tournament.as_asgi()),
]
