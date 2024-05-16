from .models import Tournament
from celery import shared_task

@shared_task
def NotifyTournamentUsers(tournament_id):
    "match making create games and notify users about the game the are registered for"
    tournament = Tournament.objects.get(id=tournament_id)
    registration = tournament.registered_users.all()
    
    print(f'Notify {registration.count()} users about {tournament.name}')
    for user in registration:
        print(f'Notify {user.username} about {tournament.name}')
    return