from enum import Enum
import uuid

from django.db import DatabaseError, IntegrityError
from user.models import RankAchievement, Ranks, User, Friends_Request, BlockList
from rest_framework import generics, serializers, status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from api.models import Notification
from user.serializers import (
    RankAchievementSerializer,
    UserSerializer,
    UserDetailSerializer,
    FriendsSerializer,
    OnlineUserSerializer,
    BlockListSerializer,
    FriendRequestSerializer
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
from django.core.exceptions import ObjectDoesNotExist
from django.forms.models import model_to_dict

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
    class QuerySerializer(serializers.Serializer):
        is_none_friend = serializers.BooleanField(required=False)
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get_queryset(self):
        user = self.request.user
        is_none_friend = False
        if user.is_anonymous:
            return User.objects.all()
        query_serializer = self.QuerySerializer(data=self.request.query_params)
        if query_serializer.is_valid():
            is_none_friend = query_serializer.validated_data.get(
                'is_none_friend', False)
        if is_none_friend:
            return User.objects.exclude(id__in=user.friends.all()).exclude(id=user.id)
        return User.objects.exclude(id=user.id)


class UsersDetail(generics.RetrieveAPIView):
    serializer_class = UserDetailSerializer
    queryset = User.objects.all()

    def perform_update(self, serializer):
        return super().perform_update(serializer)


class UsersDetailByUsername(generics.RetrieveAPIView):
    serializer_class = UserDetailSerializer
    queryset = User.objects.all()
    lookup_field = 'username'


class Profile(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserDetailSerializer
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        try:
            return super().update(request, *args, **kwargs)
        except IntegrityError:
            return Response({"message": "this entry already exists"}, status=status.HTTP_400_BAD_REQUEST)


class ChangePassword(APIView):
    class ChangePasswordSerializer(serializers.Serializer):
        old_password = serializers.CharField()
        new_password = serializers.CharField()
    serializer_class = ChangePasswordSerializer
    permission_classes = [IsAuthenticated]

    def put(self, request):
        serializer = self.ChangePasswordSerializer(data=request.data)
        if serializer.is_valid():
            user = request.user
            if not user.check_password(serializer.data.get('old_password')):
                return Response({'message': 'password is incorrect'}, status=400)
            user.set_password(serializer.data.get('new_password'))
            user.save()
            return Response({'message': 'Password changed successfully'})
        return Response(serializer.errors, status=400)


class SendFriendRequest(generics.CreateAPIView):
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


class ManageFriendRequest(APIView, BaseNotification):
    class serializer_class(serializers.Serializer):
        pass

    def put(self, request, pk):
        try:
            user = get_object_or_404(User, pk=pk)
            instance = Friends_Request.objects.get(
                Q(requester=user, addressee=self.request.user))
        except ObjectDoesNotExist:
            return Response(status=404, data={'message': 'Friend request not found'})
        self._create_notification(
            user, 'Friend Request Accepted', f'{self.request.user.username} has accepted your friend request')
        user.friends.add(self.request.user)
        self.request.user.friends.add(user)
        instance.delete()
        return Response(status=201)

    def delete(self, request, pk):
        user = get_object_or_404(User, pk=pk)
        Friends_Request.objects.filter(Q(requester=user, addressee=self.request.user) | Q(
            requester=self.request.user, addressee=user)).delete()
        return Response(status=204)


class MyBlockList(generics.ListAPIView):
    serializer_class = BlockListSerializer
    queryset = BlockList.objects.all()


class BlockUser(generics.CreateAPIView):
    serializer_class = BlockListSerializer
    queryset = BlockList.objects.all()

    def perform_create(self, serializer):
        pk = self.kwargs.get("pk")
        blocked_user = get_object_or_404(User, pk=pk)
        serializer.save(user=self.request.user, blocked_user=blocked_user)


class OnlineFriendsList(generics.ListAPIView):
    class QuerySerializer(serializers.Serializer):
        filterbyName = serializers.BooleanField(required=False)
        filterByLevel = serializers.BooleanField(required=False)
    serializer_class = OnlineUserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        query_serializer = self.QuerySerializer(data=self.request.query_params)
        friends_query = self.request.user.friends.all().filter(status='online')
        if query_serializer.is_valid():
            filterbyName = query_serializer.validated_data.get('filterbyName')
            filterByLevel = query_serializer.validated_data.get(
                'filterByLevel')
            if filterbyName:
                return friends_query.order_by('username')
            if filterByLevel:
                return friends_query.order_by('rank__hierarchy_order').order_by('current_xp').reverse()
        return friends_query


class RankAchievementList(APIView):
    serializer_class = RankAchievementSerializer

    def get(slef, request):
        user = request.user
        ranking_logs = RankAchievement.objects.all().filter(
            user=user).order_by('achieved_at')
        data = RankAchievementSerializer(ranking_logs, many=True).data
        return Response(data, status=200)

    def post(self, request):
        user = request.user
        rank_achievement = RankAchievement(
            user=user, rank=Ranks.objects.get(id=1))
        rank_achievement.save()
        return Response(status=201)


class TopPlayers(generics.ListAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all().order_by(
        'rank__hierarchy_order').order_by('current_xp').reverse()[:5]


class Ranking(generics.ListAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all().order_by('current_xp').reverse()


class InvitePlayer(APIView, BaseNotification):
    serializer_class = FriendsSerializer
    queryset = Friends_Request.objects.all()
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        user = get_object_or_404(User, pk=pk)
        game_room_id = str(uuid.uuid4())
        self._create_notification(
            user, 'Game invitation', f'{self.request.user.username} invited you to a game room {game_room_id}')
        return Response({'message': 'Invitation sent', 'game_room_id': game_room_id})


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
    permission_classes = [IsAuthenticated]

    def perform_destroy(self, instance):
        pk = self.kwargs.get("pk")
        friend = get_object_or_404(User, pk=pk)
        self.request.user.friends.remove(friend)
        return


class SearchUser(generics.ListAPIView):
    class QuerySerializer(serializers.Serializer):
        search_query = serializers.CharField(required=False)
        none_friend_only = serializers.BooleanField(required=False)

    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get_queryset(self):
        print('Get Quey')
        user = self.request.user
        none_friend_only = False
        search_query = ""

        query_serializer = self.QuerySerializer(data=self.request.query_params)
        if query_serializer.is_valid():
            none_friend_only = query_serializer.validated_data.get(
                'none_friend_only')
            search_query = query_serializer.validated_data.get('search_query')
        search_query = search_query if search_query is not None else ""
        base_query = User.objects.filter(
            Q(username__icontains=search_query) | Q(email__icontains=search_query))
        if user.is_anonymous:
            return base_query
        elif not none_friend_only:
            return base_query.exclude(id=user.id)
        else:
            return base_query.exclude(id__in=user.friends.all()).exclude(id=user.id)


class RecommendUsers(generics.ListAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        requests = Friends_Request.objects.filter(
            Q(requester=user) | Q(addressee=user))
        return User.objects.exclude(id__in=user.friends.all())\
            .exclude(id=user.id).exclude(id__in=requests.values_list('requester', flat=True))\
            .exclude(id__in=requests.values_list('addressee', flat=True))\
            .order_by('?')


class AppendingRequests(generics.ListAPIView):
    serializer_class = FriendRequestSerializer
    queryset = Friends_Request.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Friends_Request.objects.filter(addressee=self.request.user)


class UnblockUser(generics.DestroyAPIView):
    queryset = BlockList.objects.all()
    permission_classes = [IsAuthenticated]

    def perform_destroy(self, instance):
        pk = self.kwargs.get("pk")
        blocked_user = get_object_or_404(User, pk=pk)
        BlockList.objects.filter(
            user=self.request.user, blocked_user=blocked_user).delete()
        return


class LogoutAllDevices(APIView):
    permission_classes = [IsAuthenticated]
    channel_layer = get_channel_layer()
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        str_obj = json.dumps({
            'type': 'logout',
            'message': 'You have been logged out',
        })
        NotifyUser(user['id'], str_obj, self.channel_layer)
        return Response({'message': 'All devices logged out'})


def send_notification(notification, type='notification', request=None):
    channel_layer = get_channel_layer()
    notification_serialized = NotificationSerializer(
        notification,  context={'request': request}).data
    notification_serialized['type'] = type  # type of notification
    str_obj = json.dumps(notification_serialized)
    NotifyUser(notification_serialized['recipient']
               ['id'], str_obj, channel_layer)
