
from django.urls import path
from .views import listTournaments, ListGame, RegisterToTournament, RetrieveTournament
urlpatterns = [
    path('game-information/', view=ListGame.as_view(), name='home'),
    path('Tournament', view=listTournaments.as_view(), name='tournament'),
    path('Tournament/detail/<int:pk>', view=RetrieveTournament.as_view(), name='tournament-detail'),
    path('Tournament/register/<int:pk>', view=RegisterToTournament.as_view(), name='tournament-register'),

]