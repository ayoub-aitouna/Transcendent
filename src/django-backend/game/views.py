
from rest_framework.generics import ListCreateAPIView, ListAPIView, RetrieveAPIView, RetrieveDestroyAPIView, CreateAPIView
from .serializers import GameSerializer, TournamentSerializer, TournamentDetailsSerializer, TournamentsRegisteredPlayersSerializer
from .models import Game, Tournament, TournamentsRegisteredPlayers, Brackets

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
    serializer_class = TournamentsRegisteredPlayersSerializer
    queryset = TournamentsRegisteredPlayers.objects.all()

    def perform_create(self, serializer):
        tournament = Tournament.objects.get(pk=self.kwargs.get('pk'))
        Brackets(tournament=tournament, player=self.request.user).save()
        serializer.save(user=self.request.user, tournament=tournament)


class JoinGameLooby():
    pass

