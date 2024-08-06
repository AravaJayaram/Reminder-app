from django.shortcuts import render
from rest_framework import viewsets
from . models import AlarmDetails, UserDetails
from .Serializer import Details, Info
from django.http import JsonResponse
from datetime import date, datetime, timedelta
from rest_framework.response import Response
from rest_framework.views import APIView
import calendar
from django.core.mail import send_mail
from django.conf import settings
from django.utils import timezone
from django.core.management.base import BaseCommand

class DetailsViewset(viewsets.ModelViewSet):
    queryset=AlarmDetails.objects.all()
    serializer_class=Details
 
class UserViewset(viewsets.ModelViewSet):
    queryset=UserDetails.objects.all()
    serializer_class=Info

class TodayAlarmsView(APIView):
    def get(self, request, *args, **kwargs):
        today = date.today()
        alarms = AlarmDetails.objects.filter(datetime__date=today)
        serializer = Details(alarms, many=True)
        return Response(serializer.data)


# Weekly
class WeeklyAlarmsView(APIView):
    def get(self, request, *args, **kwargs):
        today = date.today()
        start_of_week = today - timedelta(days=today.weekday())  # Monday of the current week
        end_of_week = start_of_week + timedelta(days=6)  # Sunday of the current week
        alarms = AlarmDetails.objects.filter(datetime__date__range=[start_of_week, end_of_week])
        serializer = Details(alarms, many=True)
        return Response(serializer.data)

# Monthly
class MonthlyAlarmsView(APIView):
    def get(self, request, *args, **kwargs):
        today = date.today()
        start_of_month = today.replace(day=1)  # First day of the current month
        end_of_month = today.replace(day=calendar.monthrange(today.year, today.month)[1])  # Last day of the current month
        alarms = AlarmDetails.objects.filter(datetime__date__range=[start_of_month, end_of_month])
        serializer = Details(alarms, many=True)
        return Response(serializer.data)

# Last 12 Months
class Last12MonthsAlarmsView(APIView):
    def get(self, request, *args, **kwargs):
        today = date.today()
        start_of_period = today.replace(year=today.year - 1) + timedelta(days=1)  # Start of the last 12 months period
        alarms = AlarmDetails.objects.filter(datetime__date__gte=start_of_period)
        serializer = Details(alarms, many=True)
        return Response(serializer.data)
 
