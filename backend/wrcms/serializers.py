from rest_framework import serializers
from .models import *


class LectureSerializer(serializers.ModelSerializer):
    class_name = serializers.SerializerMethodField(read_only=True)
    subject_name = serializers.SerializerMethodField(read_only=True)
    teacher_name = serializers.SerializerMethodField(read_only=True)
    department_name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Lecture
        fields = ['id', 'subject_name', 'class_name', 'teacher_name', 'totalLectureDays', 'department_name']

    def get_class_name(self, obj):
        return obj.cLass.name

    def get_subject_name(self, obj):
        return obj.subject.subjectName

    def get_teacher_name(self, obj):
        return obj.teacher.userProfile.getFullName()

    def get_department_name(self, obj):
        return obj.cLass.department.name


class StudentSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Student
        fields = ['id', 'rollNumber', 'full_name']

    def get_full_name(self, obj):
        return obj.userProfile.getFullName()