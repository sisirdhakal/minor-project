from rest_framework import serializers
from .models import LeaveRequest
import pytz

class LeaveRequestSerializer(serializers.ModelSerializer):
    lecture_name = serializers.SerializerMethodField(read_only=True)
    student_name = serializers.SerializerMethodField(read_only=True)
    approver_name = serializers.SerializerMethodField(read_only=True)
    requested_datetime = serializers.SerializerMethodField(read_only=True)
    approved_datetime = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = LeaveRequest
        fields = ['id', 'student', 'student_name', 'approver_name', 'lecture_name', 'is_approved', 'requested_datetime', 'approved_datetime', 'is_archived', 'leaveStartDate', 'leaveEndDate', 'reason']

    def get_lecture_name(self, obj):
        return obj.lecture.getLectureName()
    
    def get_student_name(self, obj):
        return obj.student.userProfile.getFullName()
    
    def get_approver_name(self, obj):
        if (obj.approvedBy):
            return obj.approvedBy.userProfile.getFullName()
        else:
            return " "
        
    def get_requested_datetime(self, obj):
        tz = pytz.timezone('Asia/Kathmandu')
        localtime = obj.requested_at.astimezone(tz).strftime("%d %B %Y, %H:%M:%S")
        return localtime
    
    def get_approved_datetime(self, obj):
        if (obj.approved_at):
            tz = pytz.timezone('Asia/Kathmandu')
            localtime = obj.approved_at.astimezone(tz).strftime("%d %B %Y, %H:%M:%S")
            return localtime
        else:
            return " "