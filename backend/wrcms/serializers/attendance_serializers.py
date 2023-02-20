from rest_framework import serializers
from ..models import *


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


class PracticalClassSerializer(serializers.ModelSerializer):
    class_name = serializers.SerializerMethodField(read_only=True)
    subject_name = serializers.SerializerMethodField(read_only=True)
    department_name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = PracticalClass
        fields = ['id', 'subject_name', 'class_name', 'totalLabDays', 'department_name']

    def get_class_name(self, obj):
        return obj.cLass.name

    def get_subject_name(self, obj):
        return obj.subject.subjectName

    def get_department_name(self, obj):
        return obj.cLass.department.name        


class StudentSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Student
        fields = ['id', 'rollNumber', 'full_name']

    def get_full_name(self, obj):
        return obj.userProfile.getFullName()


# class LectureDetailSerializer(serializers.ModelSerializer):
#     students = serializers.SerializerMethodField(read_only=True)
#     class_name = serializers.SerializerMethodField(read_only=True)
#     subject_name = serializers.SerializerMethodField(read_only=True)
#     department_name = serializers.SerializerMethodField(read_only=True)

#     class Meta:
#         model = Lecture
#         fields = ['id', 'subject_name', 'class_name', 'totalLectureDays', 'department_name', 'students']

#     def get_class_name(self, obj):
#         return obj.cLass.name

#     def get_subject_name(self, obj):
#         return obj.subject.subjectName

#     def get_department_name(self, obj):
#         return obj.cLass.department.name

#     def get_students(self, obj):
#         students = sorted(Student.objects.filter(cLass=obj.cLass), key=lambda x:x.rollNumber[-3:])
#         serializer = StudentSerializer(students, many=True)
#         return serializer.data

class LectureDetailSerializer(LectureSerializer):
    students = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Lecture
        fields = ['id', 'subject_name', 'class_name', 'totalLectureDays', 'department_name', 'students']

    def get_students(self, obj):
        students = sorted(Student.objects.filter(cLass=obj.cLass), key=lambda x:x.rollNumber[-3:])
        serializer = StudentSerializer(students, many=True)
        return serializer.data

# attendance view for teacher

class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = ['date', 'status']


class StudentAttendanceSerializer(StudentSerializer):
    attendances = serializers.SerializerMethodField(read_only=True)
    presentDays = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Student
        fields = ['id', 'rollNumber', 'full_name', 'presentDays', 'attendances']

    def get_attendances(self, obj):
        lecture_id = self.context.get("lecture_id")
        lecture = Lecture.objects.get(id=lecture_id)
        student = Student.objects.get(id=obj.id)
        attendances = Attendance.objects.filter(lecture=lecture, student=student)
        serializer = AttendanceSerializer(attendances, many=True)
        return serializer.data

    def get_presentDays(self, obj):
        lecture_id = self.context.get("lecture_id")
        lecture = Lecture.objects.get(id=lecture_id)
        student = Student.objects.get(id=obj.id)
        presentCount = Attendance.objects.filter(lecture=lecture, student=student, status=True).count()
        return presentCount


class LectureAttendanceSerializer(LectureSerializer):
    students = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Lecture
        fields = ['id', 'subject_name', 'class_name', 'totalLectureDays', 'department_name', 'students']

    def get_students(self, obj):
        context = {"lecture_id": obj.id}
        students = sorted(Student.objects.filter(cLass=obj.cLass), key=lambda x:x.rollNumber[-3:])
        serializer = StudentAttendanceSerializer(students, many=True, context=context)
        return serializer.data