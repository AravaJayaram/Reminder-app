import os
import sys
import django

# Add the project base directory to the Python path
sys.path.append('/Users/aravajayaram/Documents/Project1/backaddition')

# Set the settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backaddition.settings')

# Setup Django
django.setup()

from django_celery_beat.models import PeriodicTask, CrontabSchedule
from backserver.tasks import send_alarm_email
import json

# Create a crontab schedule to run every minute
schedule, created = CrontabSchedule.objects.get_or_create(minute='*/1')

# Check if the task already exists
task_name = 'Send alarm emails every minute'
periodic_task = PeriodicTask.objects.filter(name=task_name).first()

if not periodic_task:
    # Create the periodic task if it does not exist
    PeriodicTask.objects.create(
        crontab=schedule,
        name=task_name,  # Unique name for the periodic task
        task='backserver.tasks.send_alarm_email',
        args=json.dumps([])
    )
else:
    print(f"Task '{task_name}' already exists.")
