from django.contrib import admin
from .models import UserRole, UserProfile

# Register your models here.
admin.site.register(UserRole)
admin.site.register(UserProfile)