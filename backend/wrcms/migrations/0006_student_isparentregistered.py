# Generated by Django 4.1.5 on 2023-01-13 12:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wrcms', '0005_alter_teacher_user_alter_userprofile_courtesytitle'),
    ]

    operations = [
        migrations.AddField(
            model_name='student',
            name='isParentRegistered',
            field=models.BooleanField(default=False),
        ),
    ]