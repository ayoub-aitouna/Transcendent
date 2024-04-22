from rest_framework import serializers
from user.models import User

class UserSerializer(serializers.ModelSerializer):
    password =  serializers.CharField(write_only=True)
    registration_method = serializers.CharField(read_only=True)
    class Meta:
        model = User
        fields = ['email', 'password', 'image_url', 'username', 'first_name', 'last_name',  'registration_method']
        
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

    