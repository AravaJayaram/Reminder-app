from rest_framework import serializers
from . models import AlarmDetails, UserDetails

class Details(serializers.ModelSerializer):
    class Meta:
        model=AlarmDetails
        fields='__all__'

class Info(serializers.ModelSerializer):
    class Meta:
        model=UserDetails
        fields='__all__'