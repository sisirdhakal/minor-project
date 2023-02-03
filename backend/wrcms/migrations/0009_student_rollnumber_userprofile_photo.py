# Generated by Django 4.1.5 on 2023-02-03 06:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wrcms', '0008_userprofile_email'),
    ]

    operations = [
        migrations.AddField(
            model_name='student',
            name='rollNumber',
            field=models.CharField(blank=True, max_length=12, null=True),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='photo',
            field=models.ImageField(blank=True, null=True, upload_to='profile-pictures/'),
        ),
    ]
