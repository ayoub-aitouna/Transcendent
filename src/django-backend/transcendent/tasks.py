from celery import shared_task


@shared_task
def my_task(tournament_id):
    print(f'Notify Tournament {tournament_id}, Users')
    return
