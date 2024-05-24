
from django.shortcuts import get_object_or_404
from rest_framework.generics import ListCreateAPIView, ListAPIView, RetrieveDestroyAPIView, CreateAPIView
from .serializers import (
    GameSerializer,
    MatchUpSerializer,
    TournamentSerializer,
    TournamentDetailsSerializer,
    TournamentsRegisteredPlayersSerializer)
from rest_framework import serializers
from .models import Game, Tournament, TournamentsRegisteredPlayers, Brackets, Matchup
from user.models import User
from rest_framework.permissions import IsAuthenticated


class ListGame(ListAPIView):
    serializer_class = GameSerializer
    queryset = Game.objects.all()


class listTournaments(ListCreateAPIView):
    serializer_class = TournamentSerializer
    queryset = Tournament.objects.all()


class RetrieveTournament(RetrieveDestroyAPIView):
    serializer_class = TournamentDetailsSerializer
    queryset = Tournament.objects.all()


class RegisterToTournament(CreateAPIView):
    class RegisterToTournamentSerializer(serializers.Serializer):
        pass
    
    serializer_class = RegisterToTournamentSerializer
    queryset = TournamentsRegisteredPlayers.objects.all()
    permission_classes = [IsAuthenticated]


    def perform_create(self, serializer):
        tournament = get_object_or_404(Tournament, pk=self.kwargs.get('pk'))
        bracket = Brackets.objects.filter(
            tournament=tournament
        ).filter(player=self.request.user).filter(round_number=1)
        if bracket.exists():
            return
        Brackets(tournament=tournament, player=self.request.user).save()
        TournamentsRegisteredPlayers.objects.create(user=self.request.user, tournament=tournament)


class MatchHistory(ListAPIView):
    serializer_class = MatchUpSerializer
    queryset = Matchup.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        pk = self.kwargs['pk']
        try:
            user = User.objects.get(pk=pk)
            return Matchup.objects.filter(first_player=user, second_player=user)
        except User.DoesNotExist:
            return []

class TournamentHistory(ListAPIView):
    serializer_class = TournamentsRegisteredPlayersSerializer
    queryset = TournamentsRegisteredPlayers.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return TournamentsRegisteredPlayers.objects.filter(user=self.request.user)


class JoinGameLooby():
    pass
