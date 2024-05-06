from . import views
from django.urls import path

urlpatterns = [
    path('', view=views.UsersList.as_view(), name='users'),
    path('<int:pk>/', view=views.UsersDetail.as_view(), name='user'),
    path('<int:pk>/', view=views.UsersDetail.as_view(), name='user'),
    path('update-image/<int:pk>/',
         view=views.UpdateImageApi.as_view(), name='update-image'),
    path('send-friend-request/<int:pk>',
         view=views.Send_friend_request.as_view(), name='send-friend-request'),
    path('accept-friend-request/<int:pk>',
         view=views.Accept_friend_request.as_view(), name='accept-friend-request'),
    path('decline-friend-request/<int:pk>',
         view=views.Decline_friend_request.as_view(), name='decline-friend-request'),
    path('unfriend-user/<int:pk>',
         view=views.DestroyFriendShip.as_view(), name='unfriend-user'),
    path('block-user/<int:pk>', view=views.BlockUser.as_view(), name='block-user'),
    path('send-test-notification', view=views.SendTestNotification.as_view(),
         name='send-test-notification'),

    path('online-player', view=views.OnlineFriendsList.as_view(),
         name='online-player'),
    path('invite-player/<int:pk>', view=views.InvitePlayer.as_view(),
         name='invite-player'),

]
