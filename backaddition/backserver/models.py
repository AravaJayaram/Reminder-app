
from django.db import models

class AlarmDetails(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=200)
    datetime = models.DateTimeField()
    alert_before = models.TextField()
    color = models.CharField(max_length=20, default='Grey')

    def __str__(self):
        return self.title

class UserDetails(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=50)
    dob = models.DateField()
    sex = models.CharField(max_length=10)

    def __str__(self):
        return self.name
