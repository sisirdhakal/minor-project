from rest_framework import serializers
from .models import *


class LectureSerializer(serializers.ModelSerializer):
    class_name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Lecture
        fields = ['id', 'subject', 'cLass', 'class_name', 'teacher', 'totalLecture']

    def get_class_name(self, obj):
        return obj.cLass.name