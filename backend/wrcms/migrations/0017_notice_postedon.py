# Generated by Django 4.1.5 on 2023-05-04 06:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wrcms', '0016_alter_department_deputyheadofdepartment_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='notice',
            name='postedOn',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
