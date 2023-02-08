from django.db import models
from django.contrib.auth.models import User
import random

# Create your models here.
class UserRole(models.Model):
    type = models.CharField(max_length=255)
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
    COURTESY_TITLE_CHOICES = (
        ("Mr.", "Mr."),
        ("Ms.", "Ms."),
        ("Mrs.", "Mrs."),
    )
    ID_TYPE_CHOICES = (
        ("Citizenship", "Citizenship"),
        ("Passport", "Passport"),
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    courtesyTitle = models.CharField(max_length=255, choices=COURTESY_TITLE_CHOICES, null=True, blank=True)
    firstName = models.CharField(max_length=255)
    middleName = models.CharField(max_length=255, null=True, blank=True)
    lastName = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    address = models.CharField(max_length=255, null=True, blank=True)
    contact = models.CharField(max_length=10, unique=True, null=True, blank=True)
    fathersName = models.CharField(max_length=255, null=True, blank=True)
    mothersName = models.CharField(max_length=255, null=True, blank=True)
    portalId = models.PositiveIntegerField(default=create_portalId)
    role = models.ForeignKey(UserRole, on_delete=models.SET_NULL, null=True, blank=True)
    secondaryEmail = models.EmailField(null=True, blank=True)
    secondaryContact = models.CharField(max_length=255, null=True, blank=True)
    temporaryAddress = models.CharField(max_length=255, null=True, blank=True)
    nationality = models.CharField(max_length=255, null=True, blank=True)
    identificationDocumentType = models.CharField(max_length=12, choices=ID_TYPE_CHOICES, null=True, blank=True)
    identificationDocumentNumber = models.CharField(max_length=255, unique=True)
    dateOfBirth = models.CharField(max_length=10)
    date_added = models.DateField(auto_now=True, blank=True, null=True)
    photo = models.ImageField(upload_to='profile-pictures/', null=True, blank=True)

    def getFullName(self):
        if (self.middleName):
            fullName = str(self.firstName)+' '+str(self.middleName)+' '+str(self.lastName)
        else:
            fullName = str(self.firstName)+' '+str(self.lastName)
        return fullName

    def __str__(self):
        return self.getFullName()

class Department(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    headOfDepartment = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='Head_of_Department')
    deputyHeadOfDepartment = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='Deputy_Head_of_Department')
    contact = models.CharField(max_length=10, null=True, blank=True)

    def __str__(self):
        return str(self.name)

class Batch(models.Model):
    year = models.CharField(max_length=4)
    startedFrom = models.CharField(max_length=255, null=True, blank=True)
    date_added = models.DateField(auto_now=True, blank=True, null=True)

    def __str__(self):
        return str(self.year)

class Class(models.Model):
    name = models.CharField(max_length=10)
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True)
    batch = models.ForeignKey(Batch, on_delete=models.SET_NULL, null=True)
    semester = models.IntegerField(default=1)
    classRepresentative = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="Class_Representative")
    viceClassRepresentative = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='Vice_Class_Representative')

    def __str__(self):
        return str(self.name)

class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    userProfile = models.OneToOneField(UserProfile, on_delete=models.CASCADE)
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True)
    batch = models.ForeignKey(Batch, on_delete=models.SET_NULL, null=True)
    cLass = models.ForeignKey(Class, on_delete=models.SET_NULL, null=True)
    isParentRegistered = models.BooleanField(default=False)
    date_added = models.DateField(auto_now=True, blank=True, null=True)
    rollNumber = models.CharField(max_length=12, unique=True, null=True)

    def __str__(self):
        cLass = self.cLass.name
        return cLass+'-'+self.userProfile.getFullName()

class Teacher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    userProfile = models.OneToOneField(UserProfile, on_delete=models.CASCADE)
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True)
    academicDetails = models.TextField(null=True, blank=True)
    experiences = models.TextField(null=True, blank=True)
    date_added = models.DateField(auto_now=True, blank=True, null=True)

    def __str__(self):
        department = self.department.name
        return self.userProfile.getFullName()+'-'+department

class Parent(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='User_instance_of_Parent')
    userProfile = models.OneToOneField(UserProfile, on_delete=models.CASCADE)
    parentOf = models.ForeignKey(Student, on_delete=models.SET_NULL, null=True, related_name='Student_Parent_relation')
    date_added = models.DateField(auto_now=True, blank=True, null=True)

    def __str__(self):
        studentName = self.parentOf.userProfile.getFullName()
        return self.userProfile.getFullName()+'- parent of -'+studentName


class Program(models.Model):
    name = models.CharField(max_length=1024)
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True, related_name='Program_belongs_to_department')
    syllabus = models.FileField(upload_to='syllabus/', null=True, blank=True)

    def __str__(self):
        return self.name


class Subject(models.Model):
    SUBJECT_TYPE_CHOICES = (
        ("Theory", "Theory"),
        ("Practical", "Practical"),
    )
    subjectName = models.CharField(max_length=1024)
    subjectCode = models.CharField(max_length=12, null=True, blank=True)
    program = models.ForeignKey(Program, on_delete=models.CASCADE, null=True)
    subjectType = models.CharField(max_length=10, choices=SUBJECT_TYPE_CHOICES, null=True, blank=True)
    semester = models.IntegerField()
    fullMarks = models.IntegerField(null=True, blank=True)
    passMarks = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.program.name+'-'+self.subjectName


class Lecture(models.Model):
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    cLass = models.ForeignKey(Class, on_delete=models.CASCADE)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    isArchived = models.BooleanField(default=False)
    totalLectureDays = models.IntegerField(default=0)

    def getLectureName(self):
        teacher = self.teacher.userProfile.getFullName()
        return self.cLass.name+'-'+self.subject.subjectName+'-'+teacher

    def __str__(self):
        return self.getLectureName()

class Attendance(models.Model):
    ATTENDANCE_CHOICES = (
        ("Present", "Present"),
        ("Absent", "Absent"),
    )
    lecture = models.ForeignKey(Lecture, on_delete=models.CASCADE)
    cLass = models.ForeignKey(Class, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    status = models.CharField(max_length=10, choices=ATTENDANCE_CHOICES, null=True, blank=True)
    date = models.DateField(null=True, blank=True)

    def __str__(self):
        lecture = self.lecture.getLectureName()
        return self.student.userProfile.getFullName()+'-'+lecture+'-'+self.date
