# # backserver/tasks.py

# from celery import shared_task
# from django.core.mail import send_mail
# from django.utils import timezone
# from .models import AlarmDetails, UserDetails
# from django.conf import settings

# @shared_task
# def send_alarm_email():
#     now = timezone.now()
#     alarms = AlarmDetails.objects.filter(datetime__lte=now, color='Green')
#     for alarm in alarms:
#         users = UserDetails.objects.all()
#         for user in users:
#             send_mail(
#                 f'Alarm: {alarm.title}',
#                 alarm.description,
#                 settings.DEFAULT_FROM_EMAIL,
#                 [user.email],
#                 fail_silently=False,
#             )
#         #alarm.color = 'Grey'
#         alarm.save()





from celery import shared_task
from django.core.mail import send_mail
from django.utils import timezone
from .models import AlarmDetails, UserDetails
from django.conf import settings
from datetime import timedelta
import logging

logger = logging.getLogger(__name__)

def get_alert_timedelta(alert_before):
    if alert_before == '5 minutes':
        return timedelta(minutes=5)
    elif alert_before == '15 minutes':
        return timedelta(minutes=15)
    elif alert_before == '30 minutes':
        return timedelta(minutes=30)
    elif alert_before == '60 minutes':
        return timedelta(minutes=60)
    else:
        logger.warning(f"Unexpected alert_before value: {alert_before}")
        return timedelta(minutes=0)  

@shared_task
def send_alarm_email():
    now = timezone.now()
    logger.info(f"Running send_alarm_email task at {now}")
    alarms = AlarmDetails.objects.filter(color='Green')
    logger.info(f"Found {alarms.count()} green alarms")

    for alarm in alarms:
        if alarm.datetime.tzinfo is None:
            alarm_datetime = timezone.make_aware(alarm.datetime)
        else:
            alarm_datetime = alarm.datetime

        alert_timedelta = get_alert_timedelta(alarm.alert_before)
        alert_time = alarm_datetime - alert_timedelta
        logger.info(f"Checking alarm {alarm.id} with alert time {alert_time}")

        if now >= alert_time and alarm.color == 'Green':
            logger.info(f"Sending email for alarm {alarm.id} to users")
            users = UserDetails.objects.all()
            for user in users:
                try:
                    send_mail(
                        f'Alarm: {alarm.title}',
                        alarm.description,
                        settings.DEFAULT_FROM_EMAIL,
                        [user.email],
                        fail_silently=False,
                    )
                    logger.info(f"Email sent to {user.email}")
                except Exception as e:
                    logger.error(f"Error sending email to {user.email}: {e}")

            alarm.color = 'White'
            alarm.save()
            logger.info(f"Updated alarm {alarm.id} color to grey")
        else:
            logger.info(f"Alarm {alarm.id} not due for alert yet")
