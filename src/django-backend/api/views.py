from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, serializers
from .models import Notification
from .serializers import NotificationSerializer


class HomeView(APIView):
    def get(self, request):
        return Response({'Details': 'Api is Alive!'})


class NotificationView(generics.ListAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer


class NotificationAction(generics.UpdateAPIView):
    class NAS(serializers.Serializer):
        pass

    queryset = Notification.objects.all()
    serializer_class = NAS

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.seen = True
        instance.save()
        return Response({'Details': 'Notification Updated!'})