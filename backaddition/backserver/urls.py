from django.urls import path
from .views import TodayAlarmsView, WeeklyAlarmsView, MonthlyAlarmsView, Last12MonthsAlarmsView

urlpatterns = [
    path('backserver/today-alarms/', TodayAlarmsView.as_view(), name='today-alarms'),
    path('backserver/WeeklyAlarmsView/', WeeklyAlarmsView.as_view(), name='WeeklyAlarmsView'),
    path('backserver/MonthlyAlarmsView/', MonthlyAlarmsView.as_view(), name='MonthlyAlarmsView'),
    path('backserver/Last12MonthsAlarmsView/', Last12MonthsAlarmsView.as_view(), name='Last12MonthsAlarmsView'),
]