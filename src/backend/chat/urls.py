from django.urls import path
from . import views

urlpatterns = [
    path('rooms/', views.ChatRoomsListView.as_view(), name='chatRoom'),
    path('rooms/<int:pk>/', views.ChatRoomView.as_view(), name='RoomList'),
    path('room/<int:id>/', views.MessagesView.as_view(), name='messageList'),
    path('get-chat-room/<int:id>/', views.CheckPrivateChatRoomView.as_view(),
        name='check-private-chat-room'),
    path('download-image/<int:message_id>/',
        views.DownloadMessageImageView.as_view(), name='download-image'),
    path('filter-rooms/', views.UnseenRoomsMessagesView.as_view(), name='filter-rooms'),
    path('Delete-messages/<int:room_id>/',
        views.RemoveUserMessagesView.as_view(), name='Delete-messages'),
    path('Delete-room/<int:room_id>/',
        views.RemoveUserRoomView.as_view(), name='Delete-room'),
]
