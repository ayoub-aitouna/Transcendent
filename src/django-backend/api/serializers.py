from django.urls import reverse
from rest_framework import serializers
from .models import Notification
from user.serializers import UserSerializer


class NotificationSerializer(serializers.ModelSerializer):
    recipient = UserSerializer(many=False, read_only=True)
    sender = UserSerializer(many=False, read_only=True)
    action = serializers.SerializerMethodField()
    icon = serializers.CharField(read_only=True, source='sender.image_url')
    seen = serializers.BooleanField(read_only=True)
    
    class Meta:
        model = Notification
        fields = ['recipient', 'sender', 'title', 'description', 'icon',
                  'seen', 'action', 'created_at', 'updated_at']

    def get_action(self, obj):
        pk = self.context.get('pk')
        if pk is not None:
            return reverse('notification-action', kwargs={"pk": pk},  request=self.context.get('request'))
