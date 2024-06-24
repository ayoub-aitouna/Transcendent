from django.conf import settings
from django.core.files.storage import FileSystemStorage
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers, generics, status
from rest_framework.generics import ListCreateAPIView
from rest_framework.generics import ListAPIView
from .serializers import ChatRoomsListSerializer, ChatMessageSerializer, ChatRoomSerializer, GetChatRoomSerializer
from .models import ChatRoom, ChatMessage, RemovedMessage, RemovedRoom
from rest_framework.permissions import IsAuthenticated
from asgiref.sync import async_to_sync
from .consumers.chat_consumers import get_channel_layer
from user.models import User
from django.db.models import Q
from django.contrib.auth import get_user_model


class ChatRoomsListView(ListCreateAPIView):
    serializer_class = ChatRoomsListSerializer
    queryset = ChatRoom.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        query = self.request.query_params.get('q')

        removed_rooms = RemovedRoom.objects.filter(user=user).values_list('room_id', flat=True)
        queryset = ChatRoom.objects.filter(members=user).exclude(messages_chat_room=None)

        for room in queryset:
            if not  RemovedMessage.objects.filter(message__chatRoom=room, user=user).exists():
                queryset = queryset.exclude(id__in=removed_rooms)

        if query:
            room_name_filter = Q(name__icontains=query) & Q(type='group')
            member_name_filter = Q(members__first_name__icontains=query) | Q(
                members__last_name__icontains=query) | Q(members__username__icontains=query)
            member_name_filter &= Q(type='private')

            queryset = queryset.filter(room_name_filter | member_name_filter).distinct()

        return queryset

class RemoveUserRoomView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        room_id = kwargs['room_id']
        user = self.request.user

        room = ChatRoom.objects.filter(id=room_id, members=user).first()
        if room:
            RemovedRoom.objects.get_or_create(user=user, room=room)
            messages = ChatMessage.objects.filter(
                chatRoom_id=room_id, chatRoom__members=user)
            for message in messages:
                RemovedMessage.objects.get_or_create(
                    user=user, message=message)
            return Response({'message': 'Room and messages removed for the user.'})
        else:
            return Response({'error': 'Room not found or user is not a member.'}, status=status.HTTP_404_NOT_FOUND)


class MessagesView(ListCreateAPIView):
    serializer_class = ChatMessageSerializer
    queryset = ChatMessage.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        id = self.kwargs['id']
        user = self.request.user
        return ChatMessage.objects.\
            filter(chatRoom__id=id, chatRoom__members=user).\
            exclude(id__in=RemovedMessage.objects.filter(user=user).values('message_id')).\
            order_by('created_at')

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.seen = True
        instance.save()
        return Response({'Details': 'Messages Updated!'})

    def perform_create(self, serializer):
        instance = serializer.save()
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            f"chat_{instance.chatRoom_id}",
            {
                'type': 'chat_message',
                'message': serializer.data,
            }
        )


class RemoveUserMessagesView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        room_id = kwargs['room_id']
        user = self.request.user
        messages = ChatMessage.objects.filter(
            chatRoom_id=room_id, chatRoom__members=user)
        for message in messages:
            RemovedMessage.objects.get_or_create(user=user, message=message)
        return Response({'message': 'Selected messages have been removed for the user.'})


class ChatRoomView(generics.RetrieveAPIView):
    serializer_class = ChatRoomSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        room_id = self.kwargs['pk']
        user = self.request.user
        room = ChatRoom.objects.filter(id=room_id).exclude(messages_chat_room=None)
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
        user_id = self.kwargs.get('id')
        user = self.request.user
        queryset = ChatRoom.objects.filter(
            type='private', members=user).filter(members=user_id)
        unseen_messages = ChatMessage.objects.filter(
            chatRoom=queryset.first(), seen=False).exclude(sender=user)
        for message in unseen_messages:
            message.seen = True
            message.save()
        if not queryset.exists():
            user2 = User.objects.get(id=user_id)
            chat_room = ChatRoom.objects.create(type='private')
            chat_room.members.add(user, user2)
            chat_room.save()
            queryset = ChatRoom.objects.filter(
                type='private', members=user).filter(members=user_id)
        return queryset


class DownloadMessageImageView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, message_id):
        message = ChatMessage.objects.get(id=message_id)
        image = message.image_file

        fs = FileSystemStorage()
        image_url = fs.url(image.name)

        return Response({'image': request.build_absolute_uri(image_url)})


class UnseenRoomsMessagesView(ListAPIView):
    serializer_class = ChatRoomSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        user_rooms = ChatRoom.objects.filter(members=user)
        unseen_messages_rooms = ChatMessage.objects.filter(
            chatRoom__in=user_rooms, seen=False
        ).exclude(sender=user).values_list('chatRoom', flat=True).distinct()

        return ChatRoom.objects.filter(id__in=unseen_messages_rooms)
