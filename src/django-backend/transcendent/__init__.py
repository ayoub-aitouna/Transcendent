from .tasks import my_task
from datetime import timedelta
from django.utils import timezone

launch_date = timezone.now() + timedelta(minutes=1)  # example launch date

my_task.apply_async((5,6,), eta=launch_date)