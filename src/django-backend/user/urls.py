from . import views
from django.urls import path

urlpatterns = [
    path('', view=views.UsersList.as_view(), name='users'),
    path('me/', view=views.Profile.as_view(), name='my-profile'),
    path('<int:pk>/', view=views.UsersDetail.as_view(), name='user'),

    path('change-password/', view=views.ChangePassword.as_view(),
         name='change-password'),
    path('search-user/', view=views.SearchUser.as_view(), name='search-user'),
    path('recommended-users/', view=views.RecommendUsers.as_view(),
         name='recommended-users'),
    path('appending-requests/', view=views.AppendingRequests.as_view(),
         name='appending-requests'),
    path('ranking/', view=views.Ranking.as_view(), name='ranking'),
    path('top-players/', view=views.TopPlayers.as_view(), name='top-players'),
    path('send-friend-request/<int:pk>/',
         view=views.SendFriendRequest.as_view(), name='send-friend-request'),
    path('manage_friend_request/<int:pk>/', view=views.ManageFriendRequest.as_view(), name='manage-friend-request'),
    path('blocked-list/', view=views.MyBlockList.as_view(), name='block-list'),
    path('block-user/<int:pk>/',
         view=views.BlockUser.as_view(), name='block-user'),
    path('send-test-notification/',
         view=views.SendTestNotification.as_view(), name='send-test-notification'),
    path('online-players/',
         view=views.OnlineFriendsList.as_view(), name='online-player'),
    path('rank-logs/', view=views.RankAchievementList.as_view(), name="rank-logs"),
    path('invite-player/<int:pk>/',
         view=views.InvitePlayer.as_view(), name='invite-player'),
    path('unfriend-user/<int:pk>/',
         view=views.DestroyFriendShip.as_view(), name='unfriend-user'),
    path('unblock-user/<int:pk>/',
         view=views.UnblockUser.as_view(), name='unblock-user'),
    path('logout-all-devices/', view=views.LogoutAllDevices.as_view(),
         name='logout-all-devices'),
    path('<str:username>/', view=views.UsersDetailByUsername.as_view(),
         name='user-by-username'),
]
