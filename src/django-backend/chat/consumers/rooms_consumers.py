# consumers.py
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from ..models import ChatMessage, ChatRoom
from user.models import User
from chat.serializers import WsChatRoomSerializer
from rest_framework.request import Request
from asgiref.sync import sync_to_async


class ConsumerRequest():
    def __init__(self, user):
        self.user = user


class RoomsConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user = self.scope['user']
        if self.user is None:
            await self.close()
        self.user_id = self.user.id
        await self.channel_layer.group_add(f'user_rooms_{self.user.id}', self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        for room in self.rooms:
            await self.channel_layer.group_discard(room, self.channel_name)

    async def receive(self, text_data):
        my = json.dumps({
                        'message': 'hello World',
                        'room_id': 1
                        })
        data_json = json.loads(text_data)
        message = data_json['message']
        room_id = data_json['room_id']
        await self.save_message(room_id, message)

    async def chat_message(self, event):
        message = event['message']
        sender = message.get('sender')
        if self.user.id == sender:
            return
        data = await self.get_room_info(message)
        await self.send(text_data=json.dumps(data))

    @database_sync_to_async
    def get_room_info(self, message):
        room = ChatRoom.objects.get(id=message['room_id'])
        serializer = WsChatRoomSerializer(
            instance=room, context={'request': ConsumerRequest(self.user)})

        return {
            'message': message,
            'chat_room': {
                'room_name': serializer.data['room_name'],
                'room_icon': serializer.data['room_icon'],
                'last_message': serializer.data['last_message'],
                'unseen_messages_count': serializer.data['unseen_messages_count'],
                'all_messages_count': serializer.data['all_messages_count'],
            }
        }

    async def send_message(self, event):
        message = event['message']
        await self.send(text_data=json.dumps({'message': message}))

    @database_sync_to_async
    def save_message(self, room_id, message):
        room = ChatRoom.objects.get(id=room_id)
        ChatMessage.objects.create(
            chatRoom=room, sender=self.user, message=message)
