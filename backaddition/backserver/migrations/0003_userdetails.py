# Generated by Django 5.0.7 on 2024-07-23 18:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backserver', '0002_rename_alerttime_alarmdetails_alert_before_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserDetails',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=50)),
                ('dob', models.DateField()),
                ('sex', models.CharField(max_length=10)),
            ],
        ),
    ]
