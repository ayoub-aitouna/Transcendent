# from celery import shared_task
from apscheduler.schedulers.background import BackgroundScheduler
from django_apscheduler.jobstores import DjangoJobStore, register_events
from apscheduler.triggers.date import DateTrigger
import logging
logger = logging.getLogger(__name__)

# @shared_task
# def my_task(tournament_id):
#     print(f'Notify Tournament {tournament_id}, Users')
#     return


def notify_tournament_users(tournament_id):
    print(
        f'\n-----------\nNotify Tournament {tournament_id}, Users \n-----------\n')
    return


def start_scheduler(tournament_id, trigger_time):
    scheduler = BackgroundScheduler()
    scheduler.add_jobstore(DjangoJobStore(), "default")
    scheduler.add_job(
        notify_tournament_users,
        args=[tournament_id],
        trigger=DateTrigger(run_date=trigger_time),
        id=f"notify_tournament_users_{tournament_id}",
        max_instances=1,
        replace_existing=True,
    )
    register_events(scheduler)
    scheduler.start()
    logger.info("Scheduler started")
