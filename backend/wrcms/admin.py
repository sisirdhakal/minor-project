from django.contrib import admin
from django.contrib.auth.models import Group
from .models import *


admin.site.site_header = "WRCMS Admin Dashboard"

# Register your models here.
admin.site.unregister(Group)

@admin.register(UserRole)
class UserRoleAdmin(admin.ModelAdmin):
    list_display = ('type',)
    search_fields = ('type', 'description',)

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('getFullName', 'role',)

@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    pass

@admin.register(Batch)
class BatchAdmin(admin.ModelAdmin):
    pass

@admin.register(Class)
class ClassAdmin(admin.ModelAdmin):
    pass

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    pass

@admin.register(Teacher)
class TeacherAdmin(admin.ModelAdmin):
    pass

@admin.register(Parent)
class ParentAdmin(admin.ModelAdmin):
    pass

@admin.register(Program)
class ProgramAdmin(admin.ModelAdmin):
    pass

@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    pass

@admin.register(Lecture)
class LectureAdmin(admin.ModelAdmin):
    pass

@admin.register(Attendance)
class AttendanceAdmin(admin.ModelAdmin):
    pass

@admin.register(PracticalClass)
class PracticalClassAdmin(admin.ModelAdmin):
    pass

@admin.register(PracticalAttendance)
class PracticalAttendanceAdmin(admin.ModelAdmin):
    pass