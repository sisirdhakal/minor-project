from rest_framework import serializers
from ..models import *

class DepartmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Department
        fields = ['name']

class ClassSerializer(serializers.ModelSerializer):

    class Meta:
        model = Class
        fields = ['name']

class NoticeSerializer(serializers.ModelSerializer):
    postedBy = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Notice
        fields = ['id', 'title', 'content', 'file', 'postedBy']

    def get_postedBy(self, obj):
        userProfile = UserProfile.objects.get(user=obj.uploaded_by)
        return userProfile.getFullName()