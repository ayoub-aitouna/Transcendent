
from game import routing
from django.urls import re_path
from . import consumers
from django.core.cache import cache
from django.core.cache import CacheHandler

ws_urlpatterns = [
    re_path(r'ws/user/connect', consumers.ConnectedConsumer.as_asgi()),
    *routing.ws_urlpatterns,
]
