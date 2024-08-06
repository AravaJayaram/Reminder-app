import json
from django.core.management.base import BaseCommand
from django_celery_beat.models import PeriodicTask, CrontabSchedule

class Command(BaseCommand):
    help = 'Create a periodic task to send alarm emails every minute'

    def handle(self, *args, **kwargs):
        
        schedule, created = CrontabSchedule.objects.get_or_create(minute='*/1')

        
        task_name = 'Send alarm emails every minute'
        periodic_task = PeriodicTask.objects.filter(name=task_name).first()

        if not periodic_task:
           
            PeriodicTask.objects.create(
                crontab=schedule,
                name=task_name,  
                task='backserver.tasks.send_alarm_email',
                args=json.dumps([])
            )
            self.stdout.write(self.style.SUCCESS(f"Periodic task '{task_name}' created successfully."))
        else:
            self.stdout.write(self.style.WARNING(f"Periodic task '{task_name}' already exists."))
