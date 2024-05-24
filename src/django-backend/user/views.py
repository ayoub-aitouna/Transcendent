import uuid
from user.models import User, Friends_Request, BlockList
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from api.models import Notification
from user.serializers import (
    UserSerializer,
    UserDetailSerializer,
    UserUpdateImageSerializer,
    FriendsSerializer,
    OnlineUserSerializer,
    BlockListSerializer
)
from django.db.models import Q
from channels.layers import get_channel_layer
from rest_framework.views import APIView
from rest_framework.response import Response
from transcendent.consumers import NotifyUser
import json
from django.core.files.storage import default_storage
from game.tasks import NotifyTournamentUsers
from django.utils import timezone
from datetime import timedelta
from api.serializers import NotificationSerializer


class Test(APIView):
    def get(self, request):
        launch_date = timezone.now() + timedelta(minutes=1)  # example launch date
        task_id = NotifyTournamentUsers.apply_async((1,), eta=launch_date)
        return Response({'message': f'task_id {task_id} started'})


class BaseNotification():
    def _create_notification(self, addressee, title, description):
        notification = Notification(
            title=title,
            description=description,
            sender=self.request.user,
            recipient=addressee)
        notification.save()
        send_notification(notification)


class UsersList(generics.ListAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get_queryset(self):
        return User.objects.exclude(id=self.request.user.id)


class UsersDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserDetailSerializer
    queryset = User.objects.all()

    def perform_update(self, serializer):
        return super().perform_update(serializer)


class Profile(generics.RetrieveAPIView):
    serializer_class = UserDetailSerializer
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()

    def get_object(self):
        return self.request.user


class UpdateImageApi(generics.UpdateAPIView):
    serializer_class = UserUpdateImageSerializer
    queryset = User.objects.all()


class Send_friend_request(generics.CreateAPIView):
    serializer_class = FriendsSerializer
    queryset = Friends_Request.objects.all()

    def _create_notification(self, addressee):
        notification = Notification(
            title='You have a new friend request',
            description=f'{self.request.user.username} sent you a friend request',
            sender=self.request.user,
            recipient=addressee)
        notification.save()
        send_notification(notification)

    def perform_create(self, serializer):
        pk = self.kwargs.get("pk")
        addressee = get_object_or_404(User, pk=pk)
        self._create_notification(addressee)
        serializer.save(requester=self.request.user, addressee=addressee)


class Accept_friend_request(generics.UpdateAPIView):
    serializer_class = FriendsSerializer
    queryset = Friends_Request.objects.all()

    def _create_notification(self, requester):
        Notification(
            title='Your friend request has been accepted',
            icon='fa fa-user-plus',
            recipient=requester).save()

    def perform_update(self, serializer):
        instance = self.get_object()
        if instance.addressee == self.request.user:
            instance.addressee.friends.add(instance.requester)
            instance.requester.friends.add(instance.addressee)
            instance.delete()
            self._create_notification(self.get_object().requester)


class Decline_friend_request(generics.DestroyAPIView):
    serializer_class = FriendsSerializer
    queryset = Friends_Request.objects.all()

    def perform_destroy(self, instance):
        instance.delete()


class BlockUser(generics.CreateAPIView):
    serializer_class = BlockListSerializer
    queryset = BlockList.objects.all()

    def perform_create(self, serializer):
        pk = self.kwargs.get("pk")
        blocked_user = get_object_or_404(User, pk=pk)
        serializer.save(user=self.request.user, blocked_user=blocked_user)


class OnlineFriendsList(generics.ListAPIView):
    serializer_class = OnlineUserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        friends = self.request.user.friends.all()
        return friends.filter(status='online')


class TopPlayers(generics.ListAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all().order_by('current_xp').reverse()[:5]


class Ranking(generics.ListAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all().order_by('current_xp').reverse()


class InvitePlayer(APIView, BaseNotification):
    serializer_class = FriendsSerializer
    queryset = Friends_Request.objects.all()
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        user = get_object_or_404(User, pk=pk)
        game_room = f'/ws/game/{uuid.uuid4()}/'
        self._create_notification(
            user, 'Game invitation', f'{self.request.user.username} invited you to a game room {game_room}')
        return Response({'message': 'Invitation sent', 'game_room': game_room})


class SendTestNotification(APIView):
    def get(self, request):
        user = User.objects.get(id=1)
        notification = Notification(
            title='Test notification',
            description='This is a test notification',
            sender=user,
            recipient=user)
        notification.save()
        send_notification(notification=notification, request=request)
        return Response({'message': 'Notification sent'})


class DestroyFriendShip(generics.DestroyAPIView):
    queryset = User.objects.all()

    def perform_destroy(self, instance):
        pk = self.kwargs.get("pk")
        friend = get_object_or_404(User, pk=pk)
        self.request.user.friends.remove(friend)
        return


class SearchUser(generics.ListAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get_queryset(self):
        query = self.request.query_params.get('query')
        if query is None:
            return User.objects.none()
        return User.objects.filter(Q(username__icontains=query) | Q(email__icontains=query))


def send_notification(notification, type='notification', request=None):
    channel_layer = get_channel_layer()
    notification_serialized = NotificationSerializer(
        notification,  context={'request': request}).data
    notification_serialized['type'] = type  # type of notification
    str_obj = json.dumps(notification_serialized)
    NotifyUser(notification_serialized['recipient']
               ['id'], str_obj, channel_layer)
