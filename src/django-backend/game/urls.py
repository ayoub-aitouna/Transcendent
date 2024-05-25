
from django.urls import path
from .views import listTournaments, ListGame, RegisterToTournament, RetrieveTournament, MatchHistory, TournamentHistory
urlpatterns = [
    path('game-information/', view=ListGame.as_view(), name='home'),
    path('match-history/<int:pk>/',
         view=MatchHistory.as_view(), name='match-history'),
    path('Tournament/', view=listTournaments.as_view(), name='tournament'),
    path('Tournament/detail/<int:pk>/',
         view=RetrieveTournament.as_view(), name='tournament-detail'),
    path('Tournament/register/<int:pk>/',
         view=RegisterToTournament.as_view(), name='tournament-register'),
    path('tournament-history/<int:pk>/',
         view=TournamentHistory.as_view(), name='tournament-history'),

]
