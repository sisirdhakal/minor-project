from django.db import models
from django.contrib.auth.models import User
import random

# Create your models here.
class UserRole(models.Model):
    type = models.CharField(max_length=255, null=True, blank=True)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.type

def create_portalId():
    not_unique = True
    while not_unique:
        unique_code = random.randint(100000000, 999999999)
        if not UserProfile.objects.filter(portalId=unique_code):
            not_unique = False
        return unique_code

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    courtesyTitle = models.CharField(max_length=255, null=True, blank=True)
    firstName = models.CharField(max_length=255, null=True, blank=True)
    middleName = models.CharField(max_length=255, null=True, blank=True)
    lastName = models.CharField(max_length=255, null=True, blank=True)
    address = models.CharField(max_length=255, null=True, blank=True)
    contact = models.CharField(max_length=255, null=True, blank=True)
    fathersName = models.CharField(max_length=255, null=True, blank=True)
    mothersName = models.CharField(max_length=255, null=True, blank=True)
    portalId = models.PositiveIntegerField(default=create_portalId)
    role = models.ForeignKey(UserRole, on_delete=models.SET_NULL, null=True, blank=True)
    secondaryEmail = models.EmailField(null=True, blank=True)
    secondaryContact = models.CharField(max_length=255, null=True, blank=True)
    temporaryAddress = models.CharField(max_length=255, null=True, blank=True)
    nationality = models.CharField(max_length=255, null=True, blank=True)
    identificationDocumentType = models.CharField(max_length=255, null=True, blank=True)
    identificationDocumentNumber = models.CharField(max_length=255, null=True, blank=True)
    dateOfBirth = models.CharField(max_length=10, null=True, blank=True)
    date_added = models.DateField(auto_now=True, blank=True, null=True)

    def __str__(self):
        fullName = self.firstName+' '+self.middleName+' '+self.lastName
        return fullName

class Department(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    headOfDepartment = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='Head_of_Department')
    deputyHeadOfDepartment = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='Deputy_Head_of_Department')
    contact = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return self.name

class Batch(models.Model):
    year = models.CharField(max_length=4)
    startedFrom = models.CharField(max_length=255, null=True, blank=True)
    date_added = models.DateField(auto_now=True, blank=True, null=True)

    def __str__(self):
        return self.year

class Class(models.Model):
    name = models.CharField(max_length=10)
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True, blank=True)
    batch = models.ForeignKey(Batch, on_delete=models.SET_NULL, null=True, blank=True)
    semester = models.IntegerField(default=1)
    classRepresentative = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="Class_Representative")
    viceClassRepresentative = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='Vice_Class_Representative')

    def __str__(self):
        return self.name

class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    userProfile = models.OneToOneField(UserProfile, on_delete=models.CASCADE)
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True, blank=True)
    batch = models.ForeignKey(Batch, on_delete=models.SET_NULL, null=True, blank=True)
    cLass = models.ForeignKey(Class, on_delete=models.SET_NULL, null=True, blank=True)
    date_added = models.DateField(auto_now=True, blank=True, null=True)

    def __str__(self):
        studentsName = self.userProfile.firstName+' '+self.userProfile.lastName+'-'+self.cLass.name
        return studentsName

class Teacher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    userProfile = models.OneToOneField(UserProfile, on_delete=models.CASCADE)
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True, blank=True)
    academicDetails = models.TextField(null=True, blank=True)
    experiences = models.TextField(null=True, blank=True)
    date_added = models.DateField(auto_now=True, blank=True, null=True)

    def __str__(self):
        teachersName = self.userProfile.firstName+' '+self.userProfile.lastName+'-'+self.department.name
        return teachersName

class Parent(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='User_instance_of_Parent')
    userProfile = models.OneToOneField(UserProfile, on_delete=models.CASCADE)
    parentOf = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='Student_Parent_relation')
    date_added = models.DateField(auto_now=True, blank=True, null=True)

    def __str__(self):
        parentsName = self.userProfile.firstName+' '+self.userProfile.middleName+' '+self.userProfile.lastName
        return parentsName