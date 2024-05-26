from . import views
from django.urls import path

urlpatterns = [
    path('', view=views.UsersList.as_view(), name='users'),
    path('me/', view=views.Profile.as_view(), name='my-profile'),
    path('<int:pk>/', view=views.UsersDetail.as_view(), name='user'),
    path('change-password/', view=views.ChangePassword.as_view(),
         name='change-password'),
    path('search-user/', view=views.SearchUser.as_view(), name='search-user'),
    path('ranking/', view=views.Ranking.as_view(), name='ranking'),
    path('top-players/', view=views.TopPlayers.as_view(), name='top-players'),
    path('send-friend-request/<int:pk>/',
         view=views.Send_friend_request.as_view(), name='send-friend-request'),
    path('accept-friend-request/<int:pk>/',
         view=views.Accept_friend_request.as_view(), name='accept-friend-request'),
    path('remove-friend-request/<int:pk>/',
         view=views.RemoveFriendRequest.as_view(), name='remove-friend-request'),
    path('decline-friend-request/<int:pk>/',
         view=views.Decline_friend_request.as_view(), name='decline-friend-request'),

    path('block-user/<int:pk>/',
         view=views.BlockUser.as_view(), name='block-user'),

    path('send-test-notification/',
         view=views.SendTestNotification.as_view(), name='send-test-notification'),

    path('online-players/',
         view=views.OnlineFriendsList.as_view(), name='online-player'),

    path('invite-player/<int:pk>/',
         view=views.InvitePlayer.as_view(), name='invite-player'),

    path('unfriend-user/<int:pk>/',
         view=views.DestroyFriendShip.as_view(), name='unfriend-user'),

]
