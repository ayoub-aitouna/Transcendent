from django.urls import path
from . import views

urlpatterns = [
        path('', view=views.UsersList.as_view(), name='users'),
        path('<int:pk>/', view=views.UsersDetail.as_view(), name='user'),
        path('update-image/<int:pk>/', view=views.UpdateImageApi.as_view(), name='update-image'),
        path('friends/', view=views.get_friends.as_view(), name='friends'),
    ]