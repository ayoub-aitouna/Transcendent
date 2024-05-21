from django.db import models


class Notification(models.Model):
    recipient = models.ForeignKey('user.User', on_delete=models.CASCADE)
    sender = models.ForeignKey('user.User', on_delete=models.CASCADE, related_name='sender')
    title = models.CharField(max_length=200, blank=False, null=False)
    description = models.TextField(blank=True, null=True)
    seen = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    