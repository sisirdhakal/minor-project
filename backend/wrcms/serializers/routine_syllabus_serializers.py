from rest_framework import serializers
from ..models import Routine, Program

class RoutineSerializer(serializers.ModelSerializer):

    class Meta:
        model = Routine
        fields = '__all__'

class SyllabusSerializer(serializers.ModelSerializer):

    class Meta:
        model = Program
        fields = '__all__'