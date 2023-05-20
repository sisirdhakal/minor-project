from rest_framework import serializers
from .models import InternalMark
from wrcms.models import Student, Lecture, ProgramSubject
from wrcms.serializers.attendance_serializers import StudentSerializer, LectureSerializer

class InternalMarkSerializer(serializers.ModelSerializer):
    theoryFM = serializers.SerializerMethodField(read_only=True)
    practicalFM = serializers.SerializerMethodField(read_only=True)
    subject_name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = InternalMark
        fields = ['id', 'subject', 'subject_name', 'theoryFM', 'practicalFM', 'theoryAssessment', 'practicalAssessment']

    def get_theoryFM(self, obj):
        return obj.subject.theoryAssessment
    
    def get_practicalFM(self, obj):
        return obj.subject.practicalAssessment
    
    def get_subject_name(self, obj):
        return obj.subject.name

class StudentInternalMarkSerializer(StudentSerializer):
    internalMark = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Student
        fields = ['id', 'rollNumber', 'full_name', 'internalMark']

    def get_internalMark(self, obj):
        lecture_id = self.context.get("lecture_id")
        lecture = Lecture.objects.get(id=lecture_id)
        subject = lecture.subject
        semester = ProgramSubject.objects.get(subject=subject, program=lecture.cLass.program).semester
        mark = InternalMark.objects.get(subject=subject, student=obj, semester=semester)
        serializer = InternalMarkSerializer(mark, many=False)
        return serializer.data
    
class LectureInternalMarkSerializer(LectureSerializer):
    students = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Lecture
        fields = ['id', 'type', 'subject_name', 'class_name', 'department_name', 'students']

    def get_students(self, obj):
        context = {"lecture_id": obj.id}
        students = sorted(Student.objects.filter(cLass=obj.cLass), key=lambda x:x.rollNumber[-3:])
        serializer = StudentInternalMarkSerializer(students, many=True, context=context)
        return serializer.data
    

class StudentViewInternalMarkSerializer(StudentSerializer):
    internalMarks = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Student
        fields = ['id', 'rollNumber', 'full_name', 'internalMarks']

    def get_internalMarks(self, obj):
        semester = self.context.get("semester")
        marks = InternalMark.objects.filter(student=obj, semester=semester)
        serializer = InternalMarkSerializer(marks, many=True)
        return serializer.data
        