from django.conf import settings
from rest_framework.views import APIView
from rest_framework import serializers
from .serializers import IntraUserSerializer, GoogleUserSerializer
from user.serializers import UserSerializer
from rest_framework.response import Response
from user.models import User
from .mixins import ApiErrorsMixin, OAuth2Authentication
from django.core.cache import cache
from django.core.mail import send_mail
from rest_framework import generics, permissions
import random
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)


class AuthApi(generics.GenericAPIView):
    class AuthSerializer(serializers.Serializer):
        email = serializers.EmailField()
        password = serializers.IntegerField()
    serializer_class = AuthSerializer
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        return Response(status=200, data={'detail': 'success'})


class MixinsGoogleLoginApi(ApiErrorsMixin, APIView, OAuth2Authentication):
    access_token_url = 'https://oauth2.googleapis.com/token'
    client_id = settings.GOOGLE_OAUTH2_CLIENT_ID
    client_secret = settings.GOOGLE_OAUTH2_CLIENT_SECRET,
    user_info_url = 'https://www.googleapis.com/oauth2/v3/userinfo'
    serializer_class = GoogleUserSerializer


class IntraLoginApi(ApiErrorsMixin, APIView, OAuth2Authentication):
    access_token_url = 'https://api.intra.42.fr/oauth/token'
    client_id = settings.INTRA_OAUTH2_CLIENT_ID
    client_secret = settings.INTRA_OAUTH2_CLIENT_SECRET,
    user_info_url = 'https://api.intra.42.fr/v2/me'
    serializer_class = IntraUserSerializer


class RegisterEmailApi(generics.CreateAPIView):
    class EmailSerializer(serializers.Serializer):
        email = serializers.EmailField()

    serializer_class = EmailSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            self.send_mail(serializer)
        except Exception as e:
            print(f'error => {e}')
            return Response(status=400, data={'detail': str(e)})
        return Response(status=200)

    def send_mail(self, serializer):
        validated_data = serializer.validated_data
        email = validated_data.get('email')
        code = random.randint(1000, 9999)
        cache.set(email, code, timeout=5*60)
        status = send_mail(
            'Verification code',
            f'Your verification code is {code}',
            from_email='mail@api.reducte.tech',
            recipient_list=[email],
            fail_silently=False,
        )

class VerifyEmailApi(generics.CreateAPIView):
    class VerifySerializer(serializers.Serializer):
        email = serializers.EmailField()
        code = serializers.IntegerField()
    serializer_class = VerifySerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            self.verify_email(serializer)
        except Exception as e:
            print(f'error => {e}')
            return Response(status=400, data={'detail': str(e)})
        return Response(status=200)

    def verify_email(self, serializer):
        validated_data = serializer.validated_data
        email = validated_data.get('email')
        code = validated_data.get('code')
        if cache.get(email) != code:
            raise serializers.ValidationError('Invalid code')


class RegisterUserApi(generics.CreateAPIView):
    class RegisterSerializer(serializers.Serializer):
        username = serializers.CharField()
        password = serializers.CharField()
        email = serializers.EmailField()

    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]
    queryset = User.objects.all()

    def perform_create(self, serializer):
        User.objects.create_user(**serializer.validated_data)
