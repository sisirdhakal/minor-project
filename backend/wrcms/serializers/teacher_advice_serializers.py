from rest_framework import serializers
from ..models import TeacherAdvice
import pytz

class TeacherAdviceSerializer(serializers.ModelSerializer):
    lecture_name = serializers.SerializerMethodField(read_only=True)
    teacher_name = serializers.SerializerMethodField(read_only=True)
    student_name = serializers.SerializerMethodField(read_only=True)
    posted_datetime = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = TeacherAdvice
        fields = ['id', 'lecture', 'teacher', 'student', 'advice', 'posted_at', 'lecture_name', 'student_name', 'teacher_name', 'posted_datetime']

    def get_lecture_name(self, obj):
        return obj.lecture.getLectureName()
    
    def get_teacher_name(self, obj):
        return obj.teacher.userProfile.getFullName()
    
    def get_student_name(self, obj):
        return obj.student.userProfile.getFullName()
    
    def get_posted_datetime(self, obj):
        tz = pytz.timezone('Asia/Kathmandu')
        localtime = obj.posted_at.astimezone(tz).strftime("%d %B %Y, %H:%M:%S")
        return localtime
