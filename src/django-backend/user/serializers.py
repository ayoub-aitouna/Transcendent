from rest_framework import serializers
from user.models import User, Friends, Achivments, RankingLogs
from rest_framework.reverse import reverse
from django.db.models import Q

class AchivmentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achivments
        fields = '__all__'

class RankingLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = RankingLogs
        fields = '__all__'

class UserDetailSerializer(serializers.ModelSerializer):
    password =  serializers.CharField(write_only=True)
    registration_method = serializers.CharField(read_only=True)
    send_request = serializers.HyperlinkedIdentityField(view_name='send-friend-request', lookup_field='pk')
    achivments = AchivmentsSerializer(many=True, read_only=True)
    friends_list = serializers.SerializerMethodField()
    friend_requests = serializers.SerializerMethodField()
    fullname = serializers.SerializerMethodField()
    ranking_logs = RankingLoginSerializer(read_only=True, many=True)
    
    def __init__(self, *args, **kwargs):
        super(UserDetailSerializer, self).__init__(*args, **kwargs)
        if self.context.get('view').kwargs.get('pk') == self.context.get('request').user.id:
            self.fields.pop('send_request')

    class Meta:
        model = User
        fields = ['fullname', 'username', 'first_name', 'last_name',
                  'email', 'password', 'image_url', 'registration_method','coins', 'current_xp',
                  'friends_list', 'friend_requests', 'achivments','ranking_logs', 'send_request']
    
    def get_fullname(self, obj):
        return f'{obj.first_name} {obj.last_name}'
    
    def get_friendship_list(self):
        user_id = self.context.get('view').kwargs.get('pk')
        current_user = User.objects.get(pk=user_id)
        friends_as_requester = User.objects.filter(Q(requster__addressee=current_user) & Q(requster__is_accepted=True))
        friends_as_addresse =  User.objects.filter(Q(addressee__addressee=current_user) & Q(addressee__is_accepted=True))
        friends = friends_as_requester | friends_as_addresse
        q = friends.exclude(id=user_id).distinct()
        return q
    
    def get_friends_list(self, obj):
        q = self.get_friendship_list()
        return UserFriedndsSerializer(q, many=True, context=self.context).data
    
    def get_friend_requests(self, obj):
        user_id = self.context.get('view').kwargs.get('pk')
        current_user = User.objects.get(pk=user_id)
        q = User.objects.filter((
                Q(requster__addressee=current_user) &
                Q(requster__is_accepted=False) &
                Q(requster__is_blocked=False)
            )
        ).filter(~Q(id=user_id)).distinct()
        return FriendRequestSerializer(q, many=True, context=self.context).data
   
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

class UserSerializer(serializers.ModelSerializer):
    fullname = serializers.SerializerMethodField()
    url = serializers.HyperlinkedIdentityField(view_name='user', lookup_field='pk')
    send_request = serializers.HyperlinkedIdentityField(view_name='send-friend-request', lookup_field='pk')
   
    class Meta:
        model = User
        fields = ['image_url', 'fullname', 'username', 'url', 'send_request']
    
    def get_fullname(self, obj):
        return f'{obj.first_name} {obj.last_name}'
    
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

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
    fullname = serializers.SerializerMethodField()
    accept_fiend_request = serializers.SerializerMethodField()
    url = serializers.HyperlinkedIdentityField(view_name='user', lookup_field='pk')
    
    class Meta:
        model =  User
        fields = ['image_url', 'fullname', 'username', 'url', 'accept_fiend_request']

    def get_fullname(self, obj):
        return f'{obj.first_name} {obj.last_name}'
    
    def get_accept_fiend_request(self, obj):
        pk = obj.requster.values()[0].get("id")
        return reverse('accept-friend-request', kwargs={"pk": pk},  request=self.context.get('request'))

    def get_url(self, obj):
        return reverse('user', kwargs={"pk": obj.requster.pk},  request=self.context.get('request'))

class FriendsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Friends
        fields = []

class UserFriedndsSerializer(serializers.ModelSerializer): 
    fullname = serializers.SerializerMethodField()
    url = serializers.HyperlinkedIdentityField(view_name='user', lookup_field='pk')
    unfriend = serializers.SerializerMethodField()
    block = serializers.SerializerMethodField()
    message  = serializers.HyperlinkedIdentityField(view_name='block-user', lookup_field='pk')
   
    class Meta:
        model = User
        fields = ['image_url', 'fullname', 'username', 'url', 'unfriend', 'block', 'message']
    
    def get_fullname(self, obj):
        return f'{obj.first_name} {obj.last_name}'

    def get_fiendship_id(self, obj):
        user_id = self.context.get('view').kwargs.get('pk')
        qlist = obj.addressee.filter(Q(requster_id=user_id) | Q(addressee_id=user_id)) | obj.requster.filter(Q(requster_id=user_id) | Q(addressee_id=user_id))
        return qlist.values()[0].get("id")
    
    def get_block(self, obj):
        pk = self.get_fiendship_id(obj)
        return reverse('block-user', kwargs={"pk": pk},  request=self.context.get('request'))
    
    def get_unfriend(self, obj):
        pk = self.get_fiendship_id(obj)
        return reverse('unfriend-user', kwargs={"pk": pk},  request=self.context.get('request'))
    
