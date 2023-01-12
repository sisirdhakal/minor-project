# Generated by Django 4.1.5 on 2023-01-12 16:26

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import wrcms.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Batch',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('year', models.CharField(max_length=4)),
                ('startedFrom', models.CharField(blank=True, max_length=255, null=True)),
                ('date_added', models.DateField(auto_now=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Class',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=10)),
                ('semester', models.IntegerField(default=1)),
                ('batch', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='wrcms.batch')),
                ('classRepresentative', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='Class_Representative', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Department',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField(blank=True, null=True)),
                ('contact', models.CharField(blank=True, max_length=255, null=True)),
                ('deputyHeadOfDepartment', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='Deputy_Head_of_Department', to=settings.AUTH_USER_MODEL)),
                ('headOfDepartment', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='Head_of_Department', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='UserRole',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(blank=True, max_length=255, null=True)),
                ('description', models.TextField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('courtesyTitle', models.CharField(blank=True, max_length=255, null=True)),
                ('firstName', models.CharField(blank=True, max_length=255, null=True)),
                ('middleName', models.CharField(blank=True, max_length=255, null=True)),
                ('lastName', models.CharField(blank=True, max_length=255, null=True)),
                ('address', models.CharField(blank=True, max_length=255, null=True)),
                ('contact', models.CharField(blank=True, max_length=255, null=True)),
                ('fathersName', models.CharField(blank=True, max_length=255, null=True)),
                ('mothersName', models.CharField(blank=True, max_length=255, null=True)),
                ('portalId', models.PositiveIntegerField(default=wrcms.models.create_portalId)),
                ('secondaryEmail', models.EmailField(blank=True, max_length=254, null=True)),
                ('secondaryContact', models.CharField(blank=True, max_length=255, null=True)),
                ('temporaryAddress', models.CharField(blank=True, max_length=255, null=True)),
                ('nationality', models.CharField(blank=True, max_length=255, null=True)),
                ('identificationDocumentType', models.CharField(blank=True, max_length=255, null=True)),
                ('identificationDocumentNumber', models.CharField(blank=True, max_length=255, null=True)),
                ('date_added', models.DateField(auto_now=True, null=True)),
                ('role', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='wrcms.userrole')),
                ('user', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Teacher',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('academicDetails', models.TextField(blank=True, null=True)),
                ('experiences', models.TextField(blank=True, null=True)),
                ('date_added', models.DateField(auto_now=True, null=True)),
                ('department', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='wrcms.department')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('userProfile', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='wrcms.userprofile')),
            ],
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_added', models.DateField(auto_now=True, null=True)),
                ('batch', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='wrcms.batch')),
                ('cLass', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='wrcms.class')),
                ('department', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='wrcms.department')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('userProfile', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='wrcms.userprofile')),
            ],
        ),
        migrations.CreateModel(
            name='Parent',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_added', models.DateField(auto_now=True, null=True)),
                ('parentOf', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='Student_Parent_relation', to=settings.AUTH_USER_MODEL)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='User_instance_of_Parent', to=settings.AUTH_USER_MODEL)),
                ('userProfile', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='wrcms.userprofile')),
            ],
        ),
        migrations.AddField(
            model_name='class',
            name='department',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='wrcms.department'),
        ),
        migrations.AddField(
            model_name='class',
            name='viceClassRepresentative',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='Vice_Class_Representative', to=settings.AUTH_USER_MODEL),
        ),
    ]
