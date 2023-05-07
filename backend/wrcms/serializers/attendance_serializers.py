from rest_framework import serializers
from ..models import *


class LectureSerializer(serializers.ModelSerializer):
    class_name = serializers.SerializerMethodField(read_only=True)
    subject_name = serializers.SerializerMethodField(read_only=True)
    teacher_name = serializers.SerializerMethodField(read_only=True)
    department_name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Lecture
        fields = ['id', 'subject_name', 'type', 'class_name', 'teacher_name', 'totalLectureDays', 'department_name']

    def get_class_name(self, obj):
        return obj.cLass.name

    def get_subject_name(self, obj):
        return obj.subject.name

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
        return obj.subject.name

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
#         return obj.subject.name

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
        fields = ['id', 'type', 'subject_name', 'class_name', 'totalLectureDays', 'department_name', 'students']

    def get_students(self, obj):
        students = sorted(Student.objects.filter(cLass=obj.cLass), key=lambda x:x.rollNumber[-3:])
        serializer = StudentSerializer(students, many=True)
        return serializer.data

# attendance view for teacher

class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = ['id', 'date', 'status']


class StudentAttendanceSerializer(StudentSerializer):
    attendances = serializers.SerializerMethodField(read_only=True)
    presentDays = serializers.SerializerMethodField(read_only=True)
    presentPercentage = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Student
        fields = ['id', 'rollNumber', 'full_name', 'presentDays', 'presentPercentage', 'attendances']

    def get_attendances(self, obj):
        lecture_id = self.context.get("lecture_id")
        lecture = Lecture.objects.get(id=lecture_id)
        student = Student.objects.get(id=obj.id)
        attendances = Attendance.objects.filter(lecture=lecture, student=student).order_by('date')
        serializer = AttendanceSerializer(attendances, many=True)
        return serializer.data

    def get_presentDays(self, obj):
        lecture_id = self.context.get("lecture_id")
        lecture = Lecture.objects.get(id=lecture_id)
        student = Student.objects.get(id=obj.id)
        presentCount = Attendance.objects.filter(lecture=lecture, student=student, status=True).count()
        return presentCount

    def get_presentPercentage(self, obj):
        lecture_id = self.context.get("lecture_id")
        lecture = Lecture.objects.get(id=lecture_id)
        student = Student.objects.get(id=obj.id)
        presentCount = Attendance.objects.filter(lecture=lecture, student=student, status=True).count()
        percent = int(presentCount/lecture.totalLectureDays*100)
        return percent


class LectureAttendanceSerializer(LectureSerializer):
    students = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Lecture
        fields = ['id', 'type', 'subject_name', 'class_name', 'totalLectureDays', 'department_name', 'students']

    def get_students(self, obj):
        context = {"lecture_id": obj.id}
        students = sorted(Student.objects.filter(cLass=obj.cLass), key=lambda x:x.rollNumber[-3:])
        serializer = StudentAttendanceSerializer(students, many=True, context=context)
        return serializer.data


class EditAttendanceStudentSerializer(StudentSerializer):
    attendance = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Student
        fields = ['id', 'rollNumber', 'full_name', 'attendance']

    def get_attendance(self, obj):
        lecture_id = self.context.get("lecture_id")
        date = self.context.get("attendanceDate")
        lecture = Lecture.objects.get(id=lecture_id)
        student = Student.objects.get(id=obj.id)
        attendance = Attendance.objects.get(lecture=lecture, student=student, date=date)
        serializer = AttendanceSerializer(attendance, many=False)
        return serializer.data
    

class ViewStudentAttendanceSerializer(LectureSerializer):
    attendance = serializers.SerializerMethodField(read_only=True)
    presentDays = serializers.SerializerMethodField(read_only=True)
    presentPercentage = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Lecture
        fields = ['id', 'type', 'subject_name', 'teacher_name', 'totalLectureDays', 'presentDays', 'presentPercentage', 'attendance']

    def get_attendance(self, obj):
        student_id = self.context.get("student_id")
        student = Student.objects.get(id=student_id)
        attendances = Attendance.objects.filter(lecture=obj, student=student)
        serializer = AttendanceSerializer(attendances, many=True)
        return serializer.data

    def get_presentDays(self, obj):
        student_id = self.context.get("student_id")
        student = Student.objects.get(id=student_id)
        presentCount = Attendance.objects.filter(lecture=obj, student=student, status=True).count()
        return presentCount

    def get_presentPercentage(self, obj):
        if obj.totalLectureDays == 0:
            return 0
        else:
            student_id = self.context.get("student_id")
            student = Student.objects.get(id=student_id)
            presentCount = Attendance.objects.filter(lecture=obj, student=student, status=True).count()
            percent = int(presentCount/obj.totalLectureDays*100)
            return percent