# Generated by Django 4.1.5 on 2023-02-01 19:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wrcms', '0007_alter_userprofile_identificationdocumenttype'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='email',
            field=models.EmailField(blank=True, max_length=254, null=True),
        ),
    ]
