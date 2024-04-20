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