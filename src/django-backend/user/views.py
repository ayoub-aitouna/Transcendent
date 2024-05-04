from user.models import User, Friends
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from api.models import Notification
from user.serializers import (
    UserSerializer,
    UserDetailSerializer,
    UserUpdateImageSerializer,
    FriendsSerializer
)
from django.db.models import Q
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

from rest_framework.views import APIView
from rest_framework.response import Response
import json


class UsersList(generics.ListAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get_queryset(self):
        return User.objects.exclude(id=self.request.user.id)


class UsersDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserDetailSerializer
    queryset = User.objects.all()


class UpdateImageApi(generics.UpdateAPIView):
    serializer_class = UserUpdateImageSerializer
    queryset = User.objects.all()


class Send_friend_request(generics.CreateAPIView):
    serializer_class = FriendsSerializer
    queryset = Friends.objects.all()

    def _create_notification(self, addresse):
        notification = Notification(
            title='You have a new friend request',
            icon='fa fa-user-plus',
            recipient=addresse)
        send_notification(notification)
        notification.save()

    def perform_create(self, serializer):
        pk = self.kwargs.get("pk")
        addresse = get_object_or_404(User, pk=pk)
        self._create_notification(addresse)
        serializer.save(requster=self.request.user, addressee=addresse)


class Accept_friend_request(generics.UpdateAPIView):
    serializer_class = FriendsSerializer
    queryset = Friends.objects.all()

    def _create_notification(self, requester):
        Notification(
            title='Your friend request has been accepted',
            icon='fa fa-user-plus',
            recipient=requester).save()

    def perform_update(self, serializer):
        self._create_notification(self.get_object().requster)
        serializer.save(is_accepted=True)


class Decline_friend_request(generics.DestroyAPIView):
    serializer_class = UserSerializer
    queryset = Friends.objects.all()

    def perform_destroy(self, instance):
        instance.delete()


class DestroyFriendShip(generics.DestroyAPIView):
    serializer_class = FriendsSerializer
    queryset = Friends.objects.all()

    def perform_destroy(self, instance):
        instance.delete()


class BlockUser(generics.UpdateAPIView):
    serializer_class = FriendsSerializer
    queryset = Friends.objects.all()

    def perform_update(self, serializer):
        serializer.save(is_blocked=True)


class SendTestNotification(APIView):
    def get(self, request):
        print('user', )
        notification = Notification(
            title='Test notification',
            icon='fa fa-user-plus',
            recipient=self.request.user)
        send_notification(notification)
        return Response({'message': 'Notification sent'})


def send_notification(notification):
    channel_layer = get_channel_layer()
    print(f'send to group notifications_{notification.recipient.id}')
    str_obj = json.dumps({
        'id': notification.id,
        'title': notification.title,
        'icon': notification.icon,
    })
    async_to_sync(channel_layer.group_send)(
        f'notification_{notification.recipient.id}',
        {
            'type': 'notification',
            'notification': str_obj
        }
    )
