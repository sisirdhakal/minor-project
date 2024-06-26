from django.db import models
from django.contrib.auth.models import User
import random
from cloudinary_storage.storage import MediaCloudinaryStorage

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
    identificationDocumentNumber = models.CharField(max_length=255, null=True, blank=True)
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
    headOfDepartment = models.ForeignKey('wrcms.Teacher', on_delete=models.SET_NULL, null=True, blank=True, related_name='Head_of_Department')
    deputyHeadOfDepartment = models.ForeignKey('wrcms.Teacher', on_delete=models.SET_NULL, null=True, blank=True, related_name='Deputy_Head_of_Department')
    contact = models.CharField(max_length=10, null=True, blank=True)
    mail = models.EmailField(null=True, blank=True)

    def __str__(self):
        return str(self.name)

class Batch(models.Model):
    year = models.CharField(max_length=4, unique=True)
    startedFrom = models.CharField(max_length=255, null=True, blank=True)
    graduated = models.BooleanField(default=False)
    date_added = models.DateField(auto_now=True, blank=True, null=True)

    def __str__(self):
        return str(self.year)

class Class(models.Model):
    name = models.CharField(max_length=10)
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True)
    program = models.ForeignKey('wrcms.Program', on_delete=models.SET_NULL, null=True)
    batch = models.ForeignKey(Batch, on_delete=models.SET_NULL, null=True)
    semester = models.IntegerField(default=1)
    classRepresentative = models.ForeignKey('wrcms.Student', on_delete=models.SET_NULL, null=True, blank=True, related_name="Class_Representative")
    viceClassRepresentative = models.ForeignKey('wrcms.Student', on_delete=models.SET_NULL, null=True, blank=True, related_name='Vice_Class_Representative')

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
    is_graduated = models.BooleanField(default=False)

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
    is_working = models.BooleanField(default=True)

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
    subjects = models.ManyToManyField('wrcms.Subject', through='wrcms.ProgramSubject')

    def __str__(self):
        return self.name


class Subject(models.Model):
    SUBJECT_TYPE_CHOICES = (
        ("Theory", "Theory"),
        ("Practical", "Practical"),
        ("Both", "Both")
    )
    name = models.CharField(max_length=1024)
    code = models.CharField(max_length=12, null=True, blank=True)
    # program = models.ForeignKey(Program, on_delete=models.CASCADE, null=True)
    type = models.CharField(max_length=10, choices=SUBJECT_TYPE_CHOICES, null=True, blank=True)
    # semester = models.IntegerField()
    theoryAssessment = models.IntegerField(default=0)
    theoryFinal = models.IntegerField(default=0)
    practicalAssessment = models.IntegerField(default=0)
    practicalFinal = models.IntegerField(default=0)
    programs = models.ManyToManyField('wrcms.Program', through='wrcms.ProgramSubject')

    def __str__(self):
        return self.name

class ProgramSubject(models.Model):
    program = models.ForeignKey('wrcms.Program', on_delete=models.CASCADE)
    subject = models.ForeignKey('wrcms.Subject', on_delete=models.CASCADE)
    semester = models.IntegerField()

    def __str__(self):
        return self.program.name+'-'+self.subject.name
    
class Lecture(models.Model):
    LECTURE_TYPE_CHOICES = (
        ("Theory", "Theory"),
        ("Practical", "Practical"),
    )
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    type = models.CharField(max_length=10, choices=LECTURE_TYPE_CHOICES)
    cLass = models.ForeignKey(Class, on_delete=models.CASCADE)
    semester = models.IntegerField(default=1)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, related_name='Teacher_one')
    teacher2 = models.ForeignKey(Teacher, on_delete=models.SET_NULL, null=True, blank=True, related_name='Teacher_two')
    isArchived = models.BooleanField(default=False)
    totalLectureDays = models.IntegerField(default=0)
    internalMarksAdded = models.BooleanField(default=False)

    def getLectureName(self):
        teacher = self.teacher.userProfile.getFullName()
        return self.cLass.name+' - '+self.subject.name+' - '+str(self.semester)+' semester'

    def __str__(self):
        return self.getLectureName()


# class PracticalClass(models.Model):
#     subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
#     cLass = models.ForeignKey(Class, on_delete=models.CASCADE)
#     semester = models.IntegerField(default=1)
#     teacherOne = models.ForeignKey(Teacher, on_delete=models.SET_NULL, null=True, related_name='Teacher_One')
#     teacherTwo = models.ForeignKey(Teacher, on_delete=models.SET_NULL, null=True, blank=True, related_name='Teacher_Two')
#     isArchived = models.BooleanField(default=False)
#     totalLabDays = models.IntegerField(default=0)

#     def getPracticalClassName(self):
#         teacher = self.teacherOne.userProfile.getFullName()
#         return self.cLass.name+'-'+self.subject.name+'-'+teacher

#     def __str__(self):
#         return self.getPracticalClassName()



class Attendance(models.Model):
    lecture = models.ForeignKey(Lecture, on_delete=models.CASCADE)
    cLass = models.ForeignKey(Class, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    status = models.BooleanField(default=True)
    date = models.DateField(null=True, blank=True)

    def __str__(self):
        lecture = self.lecture.getLectureName()
        return self.student.userProfile.getFullName()+'-'+lecture+'-'+str(self.date)



# class PracticalAttendance(models.Model):
#     practicalClass = models.ForeignKey(PracticalClass, on_delete=models.CASCADE)
#     cLass = models.ForeignKey(Class, on_delete=models.CASCADE)
#     student = models.ForeignKey(Student, on_delete=models.CASCADE)
#     status = models.BooleanField(default=True)
#     date = models.DateField(null=True, blank=True)

#     def __str__(self):
#         practical = self.practicalClass.getPracticalClassName()
#         return self.student.userProfile.getFullName()+'-'+practical+'-'+str(self.date)


class Notice(models.Model):
    NOTICE_TYPE_CHOICES = (
        ("Class", "Class"),
        ("Department", "Department"),
        ("College", "College")
    )
    title = models.CharField(max_length=1024)
    uploaded_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    noticeType = models.CharField(max_length=10, choices=NOTICE_TYPE_CHOICES, null=True, blank=True)
    noticeFor = models.CharField(max_length=255, null=True, blank=True)
    content = models.TextField(null=True, blank=True)
    file = models.FileField(upload_to='notices/', null=True, blank=True)
    postedOn = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title+'-'+str(self.noticeFor)


class Routine(models.Model):
    ROUTINE_TYPE_CHOICES = (
        ("ClassRoutine", "ClassRoutine"),
        ("TeacherRoutine", "TeacherRoutine")
    )
    routineType = models.CharField(max_length=14, choices=ROUTINE_TYPE_CHOICES, null=True, blank=True)
    routineFor = models.CharField(max_length=255, null=True, blank=True, unique=True)
    routineImage =  models.ImageField(upload_to='routines/', null=True, blank=True, storage=MediaCloudinaryStorage())
    information = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.routineFor+'-'+self.routineType



class TeacherAdvice(models.Model):
    teacher = models.ForeignKey(Teacher, on_delete=models.SET_NULL, null=True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    lecture = models.ForeignKey(Lecture, on_delete=models.CASCADE)
    advice = models.TextField()
    posted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.student.userProfile.getFullName()+'-'+self.lecture.getLectureName()