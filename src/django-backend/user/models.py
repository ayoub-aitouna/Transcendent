from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import UserManager


# Create your models here.
class User(AbstractUser):
    email = models.EmailField(unique=True, blank=False, null=False)
    REGISTRATION_CHOICE =[
        ('email', 'Email'),
        ('google', 'Google'),
        ('facebook', 'Facebook'),
        ('intra', 'Intra'),
    ]
    registration_method = models.CharField(max_length=10,
                                           choices=REGISTRATION_CHOICE,
                                           default='email')
    image_url = models.URLField(blank=True, null=True)
    objects = UserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    def __str__(self) -> str:
        return self.username
    

class FiendsList(models.Model):
    requster = models.ForeignKey(User, on_delete=models.CASCADE, related_name='requster')
    addressee = models.ForeignKey(User, on_delete=models.CASCADE, related_name='addressee')
    is_accepted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self) -> str:
        return f'{self.requster.username} - {self.addressee.username}'