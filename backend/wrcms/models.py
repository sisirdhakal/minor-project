from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class UserRole(models.Model):
    type = models.CharField(max_length=255, null=True, blank=True)
    description = models.TextField(null=True, blank=True)

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    courtesyTitle = models.CharField(max_length=255, null=True, blank=True)
    firstName = models.CharField(max_length=255, null=True, blank=True)
    middleName = models.CharField(max_length=255, null=True, blank=True)
    lastName = models.CharField(max_length=255, null=True, blank=True)
    address = models.CharField(max_length=255, null=True, blank=True)
    contact = models.CharField(max_length=255, null=True, blank=True)
    fathersName = models.CharField(max_length=255, null=True, blank=True)
    mothersName = models.CharField(max_length=255, null=True, blank=True)
    role = models.ForeignKey(UserRole, on_delete=models.SET_NULL)
    secondaryEmail = models.EmailField(null=True, blank=True)
    secondaryContact = models.CharField(null=True, blank=True)

class Faculty(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)