import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.layers import get_channel_layer
from channels.db import database_sync_to_async
from asgiref.sync import sync_to_async
from chat.models import ChatRoom, ChatMessage
import base64
import uuid

channel_layer = get_channel_layer()


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user = self.scope['user']
        self.room_id = self.scope['url_route']['kwargs']['room_id']
        self.room_group_name = 'chat_%s' % self.room_id
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message_text = text_data_json.get('message', '')
        image_data = text_data_json.get('image_file', None)
        if image_data:
            image_file = await self.save_image_file(image_data)
        else:
            image_file = None
        await self.save_message(message_text, image_file)
        await self.emit_to_all_members(message_text, image_file)
        await self.channel_layer.group_send(
            self.room_group_name,
            self.create_message(message_text, image_file)
        )

    async def chat_message(self, event):
        message = event['message']
        sender = message.get('sender')
        if self.user.id == sender:
            return
        await self.send(text_data=json.dumps({
            'message': message
        }))

    def create_message(self, message, image_file):
        return {
            'type': 'chat_message',
            'message': {
                'message': message,
                'image_file': image_file,
                'sender': self.user.id,
                'room_id': self.room_id
            }
        }

    async def emit_to_all_members(self, message, image_file):
        chat_room = await database_sync_to_async(ChatRoom.objects.get)(id=self.room_id)
        members_qs = chat_room.members.all()
        members = await sync_to_async(list)(members_qs)
        for member in members:
            await self.channel_layer.group_send(
                f'user_rooms_{member.id}',
                self.create_message(message, image_file)
            )

    @database_sync_to_async
    def save_message(self, message_text, image_file):
        chat_room = ChatRoom.objects.get(id=self.room_id)
        ChatMessage.objects.create(
            chatRoom=chat_room,
            sender=self.user,
            message=message_text,
            image_file=image_file
        )

    @database_sync_to_async
    def save_image_file(self, image_data):
        format, imgstr = image_data.split(';base64,')
        ext = format.split('/')[-1]
        img_data = base64.b64decode(imgstr)
        file_name = f"{uuid.uuid4()}.{ext}"
        with open(f'media/chat_images/{file_name}', 'wb') as f:
            f.write(img_data)
        return file_name
