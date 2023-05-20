from rest_framework import serializers
from .models import InternalMark
from wrcms.models import Student, Lecture
from wrcms.serializers.attendance_serializers import StudentSerializer

class InternalMarkSerializer(serializers.ModelSerializer):
    theoryFM = serializers.SerializerMethodField(read_only=True)
    practicalFM = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = InternalMark
        fields = ['id', 'theoryFM', 'practicalFM' 'theoryAssessment', 'practicalAssessment']

class StudentInternalMarkSerializer(StudentSerializer):
    internalMark = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Student
        fields = ['id', 'rollNumber', 'full_name', 'internalMark']

    def get_internalMark(self, obj):
        lecture_id = self.context.get("lecture_id")
        lecture = Lecture.objects.get(id=lecture_id)
        subject = lecture.subject
        mark = InternalMark.objects.get()
        serializer = InternalMarkSerializer(mark, many=False)
        return serializer.data
        