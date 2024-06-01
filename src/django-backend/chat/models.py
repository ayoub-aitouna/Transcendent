from django.db import models
from user.models import User

# Create your models here.
class ChatRooms(models.Model):
    name = models.CharField(max_length=200)
    admin = models.ForeignKey(User, on_delete=models.CASCADE, related_name='admin')

    def __str__(self):
        return self.name
    
class RoomMembers(models.Model):
    room = models.ForeignKey(ChatRooms, on_delete=models.CASCADE, related_name='room')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user')
    blocked = models.BooleanField(default=False)

    def __str__(self):
        return self.room.name + ' - ' + self.user.username

class Messages(models.Model):
    room = models.ForeignKey(ChatRooms, on_delete=models.CASCADE, related_name='room')
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sender')
    text = models.TextField()
    image_url = models.URLField(blank=True, null=True)
    seen = models.BooleanField(default=False)
    seen_at = models.DateTimeField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.room.name + ' - ' + self.sender.username + ' - ' + self.text[:20] + '...'