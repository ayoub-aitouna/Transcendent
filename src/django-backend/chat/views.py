from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers, generics, status
from rest_framework.generics import ListCreateAPIView
from rest_framework.generics import ListAPIView
from .serializers import ChatRoomsListSerializer, ChatMessageSerializer, ChatRoomSerializer, GetChatRoomSerializer
from .models import ChatRoom, ChatMessage
from rest_framework.permissions import IsAuthenticated
from asgiref.sync import async_to_sync
from .consumers.chat_consumers import get_channel_layer
from user.models import User


class ChatRoomsListView(ListCreateAPIView):
    serializer_class = ChatRoomsListSerializer
    queryset = ChatRoom.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return ChatRoom.objects.filter(members=user)


class MessagesView(ListCreateAPIView):
    serializer_class = ChatMessageSerializer
    queryset = ChatMessage.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        id = self.kwargs['id']
        return ChatMessage.objects.\
            filter(chatRoom__id=id, chatRoom__members=self.
                   request.user).order_by('created_at')

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.seen = True
        instance.save()
        return Response({'Details': 'Messages Updated!'})

    def perform_create(self, RetrieveUpdateDestroyAPIView):
        instance = RetrieveUpdateDestroyAPIView.save()
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            f"chat_{instance.chatRoom_id}",
            {
                'type': 'chat_message',
                'message': RetrieveUpdateDestroyAPIView.data,
            }

        )


class ChatRoomView(generics.RetrieveAPIView):
    serializer_class = ChatRoomSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        room_id = self.kwargs['pk']
        user = self.request.user
        room = ChatRoom.objects.filter(id=room_id)
        unseen_messages = ChatMessage.objects.filter(
            chatRoom=room.first(), seen=False).exclude(sender=user)
        for message in unseen_messages:
            message.seen = True
            message.save()
        return room


class CheckPrivateChatRoomView(ListAPIView):
    serializer_class = ChatRoomSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Assuming 'user_id' is captured from the URL
        user_id = self.kwargs.get('id')
        if user_id is None:
            raise ValueError('user_id is required')

        user = self.request.user
        queryset = ChatRoom.objects.filter(
            type='private', members=user).filter(members=user_id)
        return queryset
