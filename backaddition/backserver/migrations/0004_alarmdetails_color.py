# Generated by Django 5.0.7 on 2024-07-24 05:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backserver', '0003_userdetails'),
    ]

    operations = [
        migrations.AddField(
            model_name='alarmdetails',
            name='color',
            field=models.CharField(default='Grey', max_length=20),
        ),
    ]
