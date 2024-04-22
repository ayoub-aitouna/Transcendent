from rest_framework.views import APIView
from user.serializers import UserSerializer, UserUpdateImageSerializer
from rest_framework.response import Response
from user.models import User, FiendsList
from rest_framework import generics

class UsersList(generics.ListAPIView):
    serializer_class = UserSerializer
    queryset=User.objects.all()
    
class UsersDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    queryset=User.objects.all()

class UpdateImageApi(generics.UpdateAPIView):
    serializer_class = UserUpdateImageSerializer
    queryset = User.objects.all()


class get_friends(generics.ListAPIView):
    serializer_class = UserSerializer
    queryset = FiendsList.objects.all()