from django.urls import include, re_path
from . import consumers

ws_urlpatterns = [
    re_path(r'ws/game/normal/looby/', consumers.GameLobby.as_asgi()),
    re_path(r'ws/game/(?P<room_name>\w+)/$', consumers.InGame.as_asgi()),
]
