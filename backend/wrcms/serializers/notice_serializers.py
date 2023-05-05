from rest_framework import serializers
from ..models import *
import pytz    

class DepartmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Department
        fields = ['name']

class ClassSerializer(serializers.ModelSerializer):

    class Meta:
        model = Class
        fields = ['name']

class NoticeFullDetailsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Notice
        fields = '__all__'        

class NoticeSerializer(NoticeFullDetailsSerializer):
    postedBy = serializers.SerializerMethodField(read_only=True)
    postedDateTime = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Notice
        fields = ['id', 'title', 'content', 'file', 'postedBy', 'postedDateTime']

    def get_postedBy(self, obj):
        userProfile = UserProfile.objects.get(user=obj.uploaded_by)
        return userProfile.getFullName()
    
    def get_postedDateTime(self, obj):
        tz = pytz.timezone('Asia/Kathmandu')
        localtime = obj.postedOn.astimezone(tz).strftime("%d %B %Y, %H:%M:%S")
        return localtime
