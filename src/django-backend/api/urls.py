from django.urls import path, include
from .views import HomeView

urlpatterns = [
    path('', view=HomeView.as_view(), name='home'),
    path('auth/', include('authentication.urls')),
]