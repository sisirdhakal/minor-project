from django.contrib import admin
from django.contrib.auth.models import Group
from .models import UserRole, UserProfile, Department, Batch, Class, Student, Teacher


admin.site.site_header = "WRCMS Admin Dashboard"

# Register your models here.
admin.site.unregister(Group)

@admin.register(UserRole)
class UserRoleAdmin(admin.ModelAdmin):
    list_display = ('type',)
    search_fields = ('type', 'description',)

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('firstName', 'role',)

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