# Generated by Django 4.1.5 on 2023-05-10 13:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wrcms', '0023_class_graduated'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='class',
            name='graduated',
        ),
        migrations.AddField(
            model_name='batch',
            name='graduated',
            field=models.BooleanField(default=False),
        ),
    ]
