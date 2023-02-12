from rest_framework import serializers
from .models import *


class LectureSerializer(serializers.ModelSerializer):
    class_name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Lecture
        fields = ['id', 'subject', 'cLass', 'class_name', 'teacher', 'totalLecture']

    def get_class_name(self, obj):
        return obj.cLass.name


class StudentSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Student
        fields = ['id', 'rollNumber', 'full_name']

    def get_full_name(self, obj):
        return obj.userProfile.getFullName