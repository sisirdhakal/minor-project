# Generated by Django 4.1.5 on 2023-05-20 06:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wrcms', '0028_student_is_graduated_teacher_is_working'),
    ]

    operations = [
        migrations.AddField(
            model_name='lecture',
            name='internalMarksAdded',
            field=models.BooleanField(default=False),
        ),
    ]