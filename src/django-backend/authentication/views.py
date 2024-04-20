from django.conf import settings
from rest_framework.views import APIView
from rest_framework import serializers
from .serializers import InputSerializer, UserSerializer, IntraUserSerializer, GoogleUserSerializer
from rest_framework.response import Response
from django.shortcuts import redirect
from urllib.parse import urlencode
from .models import User
from .utils import google_get_access_token, google_get_user_data, generate_user_tokens
from .mixins import ApiErrorsMixin, OAuth2Authentication

from django.core.cache import cache
from django.core.mail import send_mail, get_connection
import random
from rest_framework import authentication, generics, mixins, permissions

print(f"google-auth: {settings.GOOGLE_OAUTH2_CLIENT_ID}")
# Create your views here.
if get_connection() is None:
    print('no connection')
else:
    print('connection exists')
class GoogleLoginApi(ApiErrorsMixin, APIView):
    def get(self, request):
        serializer = InputSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data
        code = validated_data.get('code')
        error = validated_data.get('error')
        
        login_url = f'{settings.BASE_FRONTEND_URL}'
        
        if error or not code:
            params = urlencode({'error': error})
            return redirect(f'{login_url}?{params}')
     
        redirect_uri = f'{settings.BASE_FRONTEND_URL}/google'
        access_token = google_get_access_token(code, redirect_uri)
        user_data = google_get_user_data(access_token)
        
        try:
            user = User.objects.get(email=user_data['email'])
            access_token, refresh_token = generate_user_tokens(user)
            response_data = {
                "user" : UserSerializer(user).data,
                'access_token':str(access_token),
                'refresh_token': str(refresh_token),
            }
            return Response(response_data)
        except User.DoesNotExist:
            username = user_data.get('email').split('@')[0]
            first_name = user_data.get('given_name', '')
            last_name = user_data.get('family_name', '')
            
            
            user = User.objects.create(
                username=username,
                first_name=first_name,
                last_name=last_name,
                email=user_data['email'],
                registration_method='google'
            )
            access_token, refresh_token = generate_user_tokens(user)
            response_data = {
                "user" : UserSerializer(user).data,
                'access_token':str(access_token),
                'refresh_token': str(refresh_token),
            }
            return Response(response_data)

class MixinsGooleLoginApi(ApiErrorsMixin, APIView, OAuth2Authentication):
    access_token_url = 'https://oauth2.googleapis.com/token'
    client_id = settings.GOOGLE_OAUTH2_CLIENT_ID
    client_secret = settings.GOOGLE_OAUTH2_CLIENT_SECRET,
    user_info_url = 'https://www.googleapis.com/oauth2/v3/userinfo'
    serializer_class = GoogleUserSerializer
    

class IntraLoginApi(ApiErrorsMixin, APIView,OAuth2Authentication):
    access_token_url = 'https://api.intra.42.fr/oauth/token'
    client_id = settings.INTRA_OAUTH2_CLIENT_ID
    client_secret = settings.INTRA_OAUTH2_CLIENT_SECRET,
    user_info_url = 'https://api.intra.42.fr/v2/me'
    serializer_class = IntraUserSerializer
    
class UsersListApi(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    

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
        print(f'validated-data => {validated_data}')
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
        print(f'status => {status}')

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


class RegisterUserApi(generics.ListCreateAPIView):
    serializer_class = UserSerializer
    permission_classes=[permissions.AllowAny]
    queryset=User.objects.all()
    
    