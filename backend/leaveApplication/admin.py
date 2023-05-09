from django.contrib import admin
from .models import LeaveRequest

# Register your models here.
@admin.register(LeaveRequest)
class LeaveRequestAdmin(admin.ModelAdmin):
    pass