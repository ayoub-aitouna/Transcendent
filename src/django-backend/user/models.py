from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import UserManager
from django.db.models import Q, CheckConstraint, UniqueConstraint, F

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
    achivments = models.ManyToManyField('Achivments', blank=True)
    friends = models.ManyToManyField('self', through='Friends', symmetrical=False)
    ranking_logs = models.ManyToManyField('Ranks', through='RankingLogs', symmetrical=False)
    coins = models.IntegerField(default=0)
    current_xp = models.IntegerField(default=0)

    objects = UserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    def __str__(self) -> str:
        return self.username

class Friends(models.Model):
    requster = models.ForeignKey(User, on_delete=models.CASCADE, related_name='requster')
    addressee = models.ForeignKey(User, on_delete=models.CASCADE, related_name='addressee')
    is_accepted = models.BooleanField(default=False)
    is_blocked = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [
            CheckConstraint(check=~Q(requster=F('addressee')), name='requster_and_addressee_must_be_different'),
            UniqueConstraint(fields=['requster', 'addressee'], name='unique_requster_addressee')
        ]

    def __str__(self) -> str:
        return f'{self.requster.username} - {self.addressee.username}'

class Achivments(models.Model):
    name = models.CharField(max_length=200)
    icon = models.CharField(max_length=200)
    requirement_value = models.IntegerField(default=0)
    requirement_type = models.CharField(max_length=200, default='join')
    description = models.TextField()
    reward_coins = models.IntegerField(default=100)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self) -> str:
        return self.name
    

class Ranks(models.Model):
    name = models.CharField(max_length=200)
    icon = models.CharField(max_length=200)
    hierarchy_order = models.IntegerField(default=0)
    xp_required = models.IntegerField(default=1000) 
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self) -> str:
        return self.name
    
class RankingLogs(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    rank = models.ForeignKey(Ranks, on_delete=models.CASCADE, related_name='rankinglogs')
    xp = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) ->str:
        return f'{self.user_id.username} - {self.rank.name}'