from channels.generic.websocket import WebsocketConsumer
from django.core.cache import cache
from user.models import User
from asgiref.sync import async_to_sync


class ConnectedConsumer(WebsocketConsumer):
    def connect(self):
        self.user = self.scope['user']
        connected_devices = cache.get(f'connected_devices_{self.get_connected_devices_prefix()}', 0)
        cache.set(f'connected_devices_{self.get_connected_devices_prefix()}', connected_devices + 1)
        print(f'group name: notification_{self.user.id}')
        async_to_sync(self.channel_layer.group_add)(
           f'notification_{self.user.id}', self.channel_name
        )
        if connected_devices == 0:
            user = User.objects.get(id=self.user.id)
            user.online = True
            user.save()
        self.accept()

    def disconnect(self, close_code):
        connected_devices = cache.get(f'connected_devices_{self.get_connected_devices_prefix()}', 0)
        cache.set(f'connected_devices_{self.get_connected_devices_prefix()}', connected_devices - 1)
        if connected_devices == 1:
            user = User.objects.get(id=self.user.id)
            user.online = False
            user.save()

    def receive(self, text_data):
        self.send(text_data=f'user_fullname: {self.user.email}')

    def notification(self, event):
        self.send(text_data=event['notification'])
    
    def get_connected_devices_prefix(self):
        return f'connected_devices_{self.user.id}'
