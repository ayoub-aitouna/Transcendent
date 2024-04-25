from rest_framework import serializers
from .models import Notification
from user.serializers import UserSerializer


class NotificationSerializer(serializers.ModelSerializer):
    recipient = UserSerializer(many=False, read_only=True)  
    action = serializers.HyperlinkedIdentityField(view_name='notification-action', lookup_field='pk')
    title = serializers.CharField(read_only=True)
    icon = serializers.CharField(read_only=True)
    seen = serializers.BooleanField(read_only=True)
    class Meta:
        model = Notification
        fields = ['recipient', 'title', 'icon', 'seen', 'action', 'created_at', 'updated_at']
