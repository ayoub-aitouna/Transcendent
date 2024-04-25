from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics

from .models import Notification
from .serializers import NotificationSerializer

class HomeView(APIView):
    def get(self, request):
        return Response({'Details': 'Api is Alive!'})

class NotificationView(generics.ListAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    
class NotificationAction(generics.UpdateAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    
    def perform_update(self, serializer):
        serializer.save(seen=True)