
# import json
# import base64
# from channels.generic.websocket import AsyncWebsocketConsumer
# from channels.layers import get_channel_layer
# from channels.db import database_sync_to_async
# from asgiref.sync import sync_to_async
# from chat.models import ChatRoom, ChatMessage, RemovedRoom
# from django.core.files.base import ContentFile

# channel_layer = get_channel_layer()

# class GetRoomsConsumer(AsyncWebsocketConsumer):
# 	async def connect(self):
# 		self.user = self.scope['user']
# 		if self.user is not None:
# 			self.room_group_name = 'get_rooms'
# 			await self.channel_layer.group_add(
# 				self.room_group_name,
# 				self.channel_name
# 			)
# 			await self.accept()
# 		else:
# 			await self.close()

# 	async def disconnect(self, close_code):
# 		await self.channel_layer.group_discard(
# 			self.room_group_name,
# 			self.channel_name
# 		)

# 	async def get_rooms(self, event):
# 		await self.send(text_data=json.dumps({
# 			'rooms': event['rooms']
# 		}))