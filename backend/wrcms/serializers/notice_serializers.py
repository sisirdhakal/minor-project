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