from django.urls import path
from chat.views import ChatRoomView, MessagesView, ChatRoomsListView

urlpatterns = [
    path('rooms/', ChatRoomsListView.as_view(), name='chatRoom'),
    path('rooms/<int:pk>/', ChatRoomView.as_view(), name='RoomList'),
    path('room/<int:id>/', MessagesView.as_view(), name='messageList'),

]
