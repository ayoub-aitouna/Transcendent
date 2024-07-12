import json
import base64
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.layers import get_channel_layer
from channels.db import database_sync_to_async
from asgiref.sync import sync_to_async
from chat.models import ChatRoom, ChatMessage, RemovedRoom
from django.core.files.base import ContentFile

channel_layer = get_channel_layer()


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user = self.scope['user']
        self.room_id = self.scope['url_route']['kwargs']['room_id']
        if not await self.is_member(self.user, self.room_id):
            await self.send(text_data=json.dumps({
                'error': 'Forbidden access'
            }))
            await self.close(code=1000)  # Use a valid close code
            return
        self.room_group_name = 'chat_%s' % self.room_id
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name)

    async def receive(self, text_data):
        if not await self.is_member(self.user, self.room_id):
            await self.send(text_data=json.dumps({
                'error': 'Forbidden access'
            }))
            await self.close(code=1000)  # Use a valid close code
            return
        data_json = json.loads(text_data)
        message_type = data_json.get('type')

        if message_type == 'text':
            message_text = data_json['message']
            await self.save_message(message_text)
            await self.emit_to_all_members(message_text)
            await self.channel_layer.group_send(
                self.room_group_name,
                self.create_message(message_text)
            )
        elif message_type == 'image':
            image_data = data_json['image']
            await self.save_image_message(image_data)
            await self.emit_to_all_members(image_data)
            await self.channel_layer.group_send(
                self.room_group_name,
                self.create_image_message(image_data)
            )

    async def chat_message(self, event):
        if not await self.is_member(self.user, self.room_id):
            await self.send(text_data=json.dumps({
                'error': 'Forbidden access'
            }))
            await self.close(code=1000)  # Use a valid close code
            return
        message = event['message']
        sender = message.get('sender')
        if self.user.id == sender:
            return
        await self.send(text_data=json.dumps({
            'message': message
        }))

    def create_message(self, message):
        return {
            'type': 'chat_message',
            'message': {
                'message': message,
                'sender': self.user.id,
                'room_id': self.room_id
            }
        }

    def create_image_message(self, image_data):
        return {
            'type': 'chat_message',
            'message': {
                'image': image_data,
                'sender': self.user.id,
                'room_id': self.room_id
            }
        }

    async def emit_to_all_members(self, message):
        chat_room = await database_sync_to_async(ChatRoom.objects.get)(id=self.room_id)
        members_qs = chat_room.members.all()
        members = await database_sync_to_async(list)(members_qs)
        for member in members:
            await self.channel_layer.group_send(
                f'user_rooms_{member.id}',
                self.create_message(message)
            )

    @database_sync_to_async
    def save_message(self, message_text):
        chat_room = ChatRoom.objects.get(id=self.room_id)
        ChatMessage.objects.create(
            chatRoom=chat_room,
            sender=self.user,
            message=message_text
        )
        removed_room = RemovedRoom.objects.filter(
            user=self.user, room=chat_room)
        removed_room.delete()
        for member in chat_room.members.all():
            if member != self.user:
                removed_room_receiver = RemovedRoom.objects.filter(
                    user=member, room=chat_room)
                if removed_room_receiver:
                    removed_room_receiver.delete()

    @database_sync_to_async
    def save_image_message(self, image_data):
        chat_room = ChatRoom.objects.get(id=self.room_id)
        format, imgstr = image_data.split(';base64,')
        ext = format.split('/')[-1]
        image_file = ContentFile(base64.b64decode(
            imgstr), name=f'{self.user.id}_{self.room_id}.{ext}')
        ChatMessage.objects.create(
            chatRoom=chat_room,
            sender=self.user,
            image_file=image_file
        )
        removed_room = RemovedRoom.objects.filter(
            user=self.user, room=chat_room)
        removed_room.delete()
        for member in chat_room.members.all():
            if member != self.user:
                removed_room_receiver = RemovedRoom.objects.filter(
                    user=member, room=chat_room)
                if removed_room_receiver:
                    removed_room_receiver.delete()

    @database_sync_to_async
    def is_member(self, user, room_id):
        return ChatRoom.objects.filter(id=room_id, members=user).exists()
