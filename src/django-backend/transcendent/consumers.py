from channels.generic.websocket import WebsocketConsumer
from django.core.cache import cache
from user.models import User
from asgiref.sync import async_to_sync


class ConnectedConsumer(WebsocketConsumer):
    def connect(self):
        self.user = self.scope['user']
        cache.delete(self.get_connected_devices_prefix())
        connected_devices = cache.get(self.get_connected_devices_prefix(), 0)
        cache.set(self.get_connected_devices_prefix(), connected_devices + 1)

        async_to_sync(self.channel_layer.group_add)(
            notification_group(self.user.id), self.channel_name
        )

        if connected_devices == 0:
            user = User.objects.get(id=self.user.id)
            user.status = 'online'
            user.save()
            print(f'user: {user.status}')
        self.accept()

    def disconnect(self, close_code):
        connected_devices = cache.get(self.get_connected_devices_prefix(), 0)
        cache.set(self.get_connected_devices_prefix(), connected_devices - 1)

        async_to_sync(self.channel_layer.group_discard)(
            notification_group(self.user.id), self.channel_name
        )
        print(
            f'connected_devices: {connected_devices} __ user_id: {self.user.id}')
        if connected_devices == 1:
            user = User.objects.get(id=self.user.id)
            user.status = 'offline'
            user.save()
            print(f'user: {user.status}')

    def receive(self, text_data):
        self.send(text_data=f'user_fullname: {self.user.email}')

    def notification(self, event):
        self.send(text_data=event['notification'])

    def get_connected_devices_prefix(self):
        return f'connected_devices_{self.user.id}'


def NotifyUser(user_id, notification, channel_layer):
    async_to_sync(channel_layer.group_send)(
        notification_group(user_id),
        {
            'type': 'notification',
            'notification': notification
        }
    )


def notification_group(user_id):
    return f'notification_{user_id}'
