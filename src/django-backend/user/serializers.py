from rest_framework import serializers
from user.models import User, Friends_Request, Ranks, Achievements, BlockList
from rest_framework.reverse import reverse
from django.db.models import Q


class AchievementsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievements
        fields = '__all__'


class RankSerializer(serializers.ModelSerializer):
    icon = serializers.SerializerMethodField()

    class Meta:
        model = Ranks
        fields = '__all__'

    def get_icon(self, obj):
        host = self.context.get('request').get_host()
        protocol = 'https' if self.context.get(
            'request').is_secure() else 'http'
        return f'{protocol}://{host}/{obj.icon}'


class UserFriendsSerializer(serializers.ModelSerializer):
    fullname = serializers.SerializerMethodField()
    url = serializers.HyperlinkedIdentityField(
        view_name='user', lookup_field='pk')
    unfriend = serializers.HyperlinkedIdentityField(
        view_name='unfriend-user', lookup_field='pk')
    block = serializers.HyperlinkedIdentityField(
        view_name='block-user', lookup_field='pk')
    message = serializers.HyperlinkedIdentityField(
        view_name='block-user', lookup_field='pk')

    class Meta:
        model = User
        fields = ['image_url', 'fullname', 'username',
                  'url', 'unfriend', 'block', 'message']

    def get_fullname(self, obj):
        return f'{obj.first_name} {obj.last_name}'.strip()


class UserSerializer(serializers.ModelSerializer):
    fullname = serializers.SerializerMethodField()
    url = serializers.HyperlinkedIdentityField(
        view_name='user', lookup_field='pk')
    send_request = serializers.HyperlinkedIdentityField(
        view_name='send-friend-request', lookup_field='pk')
    xp = serializers.IntegerField(read_only=True, source='current_xp')
    rank = RankSerializer(read_only=True)
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['image_url', 'fullname',
                  'username', 'rank', 'xp', 'coins', 'url', 'send_request']

    def get_image_url(self, obj):
        request = self.context.get("request")
        return request.build_absolute_uri(obj.image_url)

    def get_fullname(self, obj):
        return f'{obj.first_name} {obj.last_name}'.strip()

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class UserDetailSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    registration_method = serializers.CharField(read_only=True)
    send_request = serializers.HyperlinkedIdentityField(
        view_name='send-friend-request', lookup_field='pk')
    achievements = AchievementsSerializer(many=True, read_only=True)
    friends = UserFriendsSerializer(many=True, read_only=True)
    friend_requests = serializers.SerializerMethodField()
    fullname = serializers.SerializerMethodField()
    ranking_logs = RankSerializer(read_only=True, many=True)
    rank = RankSerializer(read_only=True)
    coins = serializers.IntegerField(read_only=True)
    current_xp = serializers.IntegerField(read_only=True)
    image_url = serializers.SerializerMethodField()

    def __init__(self, *args, **kwargs):
        super(UserDetailSerializer, self).__init__(*args, **kwargs)
        if self.context.get('view').kwargs.get('pk') == self.context.get('request').user.id:
            self.fields.pop('send_request')

    class Meta:
        model = User
        fields = ['fullname', 'username', 'first_name', 'last_name',
                  'email', 'password', 'image_url', 'registration_method', 'coins', 'rank', 'current_xp',
                  'friends', 'friend_requests', 'achievements', 'ranking_logs', 'send_request']

    def get_image_url(self, obj):
        request = self.context.get("request")
        return request.build_absolute_uri(obj.image_url)

    def get_fullname(self, obj):
        return f'{obj.first_name} {obj.last_name}'.strip()

    def get_friend_requests(self, obj):
        user_id = self.context.get('view').kwargs.get('pk')
        current_user = User.objects.get(pk=user_id)
        q = Friends_Request.objects.filter(addressee=current_user).distinct()
        return FriendRequestSerializer(q, many=True, context=self.context).data

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class OnlineUserSerializer(serializers.ModelSerializer):
    fullname = serializers.SerializerMethodField()
    url = serializers.HyperlinkedIdentityField(
        view_name='user', lookup_field='pk')
    send_invitation = serializers.HyperlinkedIdentityField(
        view_name='invite-player', lookup_field='pk')
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['image_url', 'fullname',
                  'username', 'url', 'send_invitation']

    def get_fullname(self, obj):
        return f'{obj.first_name} {obj.last_name}'.strip()

    def get_image_url(self, obj):
        request = self.context.get("request")
        return request.build_absolute_uri(obj.image_url)


class BlockListSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlockList
        fields = '__all__'


class UserUpdateImageSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(write_only=True)
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['image_url', 'image']

    def get_image_url(self, obj):
        request = self.context.get("request")
        print(f'obj.image.url => {obj.image}')
        return 'http://'
        # return request.build_absolute_uri(obj.image.url)


class FriendRequestSerializer(serializers.ModelSerializer):
    image_url = serializers.CharField(source='requester.image_url')
    fullname = serializers.SerializerMethodField()
    username = serializers.CharField(source='requester.username')
    accept_fiend_request = serializers.SerializerMethodField()
    decline_fiend_request = serializers.SerializerMethodField()
    url = serializers.HyperlinkedIdentityField(
        view_name='user', lookup_field='pk')
    
    class Meta:
        model = User
        fields = ['username', 'fullname', 'image_url',
                  'url', 'accept_fiend_request', 'decline_fiend_request']

    def get_fullname(self, obj):
        return f'{obj.requester.first_name} {obj.requester.last_name}'

    def get_decline_fiend_request(self, obj):
        return reverse('decline-friend-request', kwargs={"pk": obj.id},  request=self.context.get('request'))

    def get_accept_fiend_request(self, obj):
        return reverse('accept-friend-request', kwargs={"pk": obj.id},  request=self.context.get('request'))

    def get_image_url(self, obj):
        request = self.context.get("request")
        return request.build_absolute_uri(obj.image_url)

    def get_url(self, obj):
        return reverse('user', kwargs={"pk": obj.requester.id},  request=self.context.get('request'))


class FriendsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Friends_Request
        fields = []


def get_friendship_list(self):
    user_id = self.context.get('view').kwargs.get('pk')
    current_user = User.objects.get(pk=user_id)
    friends_as_requester = User.objects.filter(
        Q(requester__addressee=current_user) & Q(requester__is_accepted=True))
    friends_as_addressee = User.objects.filter(
        Q(addressee__addressee=current_user) & Q(addressee__is_accepted=True))
    friends = friends_as_requester | friends_as_addressee
    q = friends.exclude(id=user_id).distinct()
    return q
