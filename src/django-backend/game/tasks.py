from .models import Tournament, stream
from celery import shared_task
from channels.layers import get_channel_layer
from transcendent.consumers import NotifyUser
import json
import random


@shared_task
def NotifyTournamentUsers(tournament_id):
    "match making create games and notify users about the game the are registered for"
    tournament = Tournament.objects.get(id=tournament_id)
    registration = tournament.registered_users.all()

    matched_users = []
    for user in registration:
        matched_users.append(user)
        if len(matched_users) == 2:
            print(f'Notify {matched_users[0].username} and {matched_users[1].username} \
                  about {tournament.name}')
            game_room = f'/ws/game/{random.randint(1000, 9999)}{random.randint(1000, 9999)}/'
            NotifyUser(matched_users[0], tournament, game_room)
            NotifyUser(matched_users[1], tournament, game_room)
            # create stream
            stream_obj = stream(
                stream_url=game_room, player1=matched_users[0], player2=matched_users[1])
            tournament.streams.add(stream_obj)
            matched_users.clear()
        if len(matched_users) == 1:
            game_room = f'/ws/game/{random.randint(1000, 9999)}{random.randint(1000, 9999)}/'
            print(
                f'Notify {matched_users[0].username} about {tournament.name}')
            # NotifyUser(matched_users[0], tournament)
            matched_users.clear()
    return


def NotifyUser(user, tournament, room_url):
    notification_obj = {'id': user.id, 'title': f'Tournament {tournament.name} is about to start',
                        'icon': 'fa fa-trophy', 'recipient': user}
    game_room_obj = {'tournament_id': tournament.id, 'room_url': room_url}
    send_notification(notification_obj, type='tournament',
                      extra_content=game_room_obj)


def send_notification(notification, type='notification', extra_content=None):
    channel_layer = get_channel_layer()
    print(f'send to group notifications_{notification.recipient.id}')
    str_obj = json.dumps({
        'type': type,
        'id': notification.id,
        'title': notification.title,
        'icon': notification.icon,
        'extra_content': extra_content
    })
    NotifyUser(notification.recipient.id, str_obj, channel_layer)
