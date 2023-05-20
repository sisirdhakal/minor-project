from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from wrcms.models import UserProfile, Teacher, Lecture, Attendance, Student, Parent
from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator
from rest_framework import status
from ..serializers.attendance_serializers import LectureSerializer, LectureDetailSerializer, LectureAttendanceSerializer, EditAttendanceStudentSerializer, ViewStudentAttendanceSerializer
from django.db.models import Q
import datetime
from django.db import transaction
from ..email import send_student_absent_notification

@method_decorator(csrf_protect, name='dispatch')
class GetLectures(APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def get(self, request, format=None):
        user = request.user
        userProfile = UserProfile.objects.get(user=user)
        if userProfile.role.type == "Teacher":
            try:
                teacher = Teacher.objects.get(user=user, userProfile=userProfile)
                lectures = Lecture.objects.filter(Q(teacher=teacher, isArchived=False, type="Theory") | Q(teacher2=teacher, isArchived=False, type="Theory"))
                serializer = LectureSerializer(lectures, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except:
                return Response({'msg': 'No records found!'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'msg': 'Unauthorized access!'}, status=status.HTTP_401_UNAUTHORIZED)


@method_decorator(csrf_protect, name='dispatch')
class GetPracticalClass(APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def get(self, request, format=None):
        user = request.user
        userProfile = UserProfile.objects.get(user=user)
        if userProfile.role.type == "Teacher":
            try:
                teacher = Teacher.objects.get(user=user, userProfile=userProfile)
                lectures = Lecture.objects.filter(Q(teacher=teacher, isArchived=False, type="Practical") | Q(teacher2=teacher, isArchived=False, type="Practical"))
                serializer = LectureSerializer(lectures, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except:
                return Response({'msg': 'No records found!'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'msg': 'Unauthorized access!'}, status=status.HTTP_401_UNAUTHORIZED)



@method_decorator(csrf_protect, name='dispatch')
class AddAttendance(APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def get(self, request, id, format=None):
        user = request.user
        try:
            userProfile = UserProfile.objects.get(user=user)
            requestedTeacher = Teacher.objects.get(user=user, userProfile=userProfile)
            lecture = Lecture.objects.get(id=id)
            if userProfile.role.type == "Teacher" and (lecture.teacher==requestedTeacher or lecture.teacher2==requestedTeacher):
                serializer = LectureDetailSerializer(lecture, many=False)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({'msg': 'Unauthorized access!'}, status=status.HTTP_401_UNAUTHORIZED)
        except:
            return Response({'msg': 'Lecture unavailable!'}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, id, format=None):
        user = request.user
        data = self.request.data
        date = data['date']
        attendanceDate = datetime.datetime.strptime(date, "%Y/%m/%d")
        attendances = data['attendance']
        print(attendances)
        if attendances and len(attendances)==0:
            return Response({'msg': 'No attendance data'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            try:
                lecture = Lecture.objects.get(id=id)
                if Attendance.objects.filter(lecture=lecture, date=attendanceDate).exists():
                    return Response({'msg': 'Attendance already added for this day!'}, status=status.HTTP_409_CONFLICT)
                else:
                    userProfile = UserProfile.objects.get(user=user)
                    requestedTeacher = Teacher.objects.get(user=user, userProfile=userProfile)
                    if userProfile.role.type == "Teacher" and (lecture.teacher==requestedTeacher or lecture.teacher2==requestedTeacher):
                        presentStudents = Student.objects.filter(id__in=attendances)
                        allStudents = Student.objects.filter(cLass=lecture.cLass)
                        absentStudents = allStudents.exclude(id__in=presentStudents)
                        try:
                            with transaction.atomic():
                                for i in presentStudents:
                                    Attendance.objects.create(
                                        lecture = lecture,
                                        cLass = lecture.cLass,
                                        student = i,
                                        status = True,
                                        date = attendanceDate
                                    )
                                for i in absentStudents:
                                    Attendance.objects.create(
                                        lecture = lecture,
                                        cLass = lecture.cLass,
                                        student = i,
                                        status = False,
                                        date = attendanceDate
                                    )
                                    try:
                                        parent = Parent.objects.get(parentOf=i)
                                    except Parent.DoesNotExist:
                                        parent = None
                                    if(parent != None):
                                        send_student_absent_notification(parent, i, lecture, date)
                                lecture.totalLectureDays += 1
                                lecture.save()
                                return Response({'msg': 'Attendance added successfully!'}, status=status.HTTP_200_OK)
                        except:
                            return Response({'msg': 'Database error!'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                    else:
                        return Response({'msg': 'Unauthorized access!'}, status=status.HTTP_401_UNAUTHORIZED)
            except:
                return Response({'msg': 'Lecture unavailable!'}, status=status.HTTP_404_NOT_FOUND)



@method_decorator(csrf_protect, name='dispatch')
class ViewLectureAttendance(APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def get(self, request, id, format=None):
        user = request.user
        try:
            userProfile = UserProfile.objects.get(user=user)
            requestedTeacher = Teacher.objects.get(user=user, userProfile=userProfile)
            lecture = Lecture.objects.get(id=id)
            if userProfile.role.type == "Teacher" and (lecture.teacher==requestedTeacher or lecture.teacher2==requestedTeacher):
                serializer = LectureAttendanceSerializer(lecture, many=False)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({'msg': 'Unauthorized access!'}, status=status.HTTP_401_UNAUTHORIZED)
        except:
            return Response({'msg': 'Lecture unavailable!'}, status=status.HTTP_404_NOT_FOUND)
        
@method_decorator(csrf_protect, name='dispatch')
class EditLectureAttendance(APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def get(self, request, idDate, format=None):
        user = request.user
        idAndDate = idDate.split('-')
        lectureId = int(idAndDate[0])
        date = str(idAndDate[1]+'/'+idAndDate[2]+'/'+idAndDate[3])
        attendanceDate = datetime.datetime.strptime(date, "%Y/%m/%d")
        try:
            userProfile = UserProfile.objects.get(user=user)
            requestedTeacher = Teacher.objects.get(user=user, userProfile=userProfile)
            lecture = Lecture.objects.get(id=lectureId)
            students = sorted(Student.objects.filter(cLass=lecture.cLass), key=lambda x:x.rollNumber[-3:])
            if userProfile.role.type == "Teacher" and (lecture.teacher==requestedTeacher or lecture.teacher2==requestedTeacher):
                try:
                    context = {"lecture_id": lectureId, "attendanceDate": attendanceDate}
                    serializer = EditAttendanceStudentSerializer(students, many=True, context=context)
                    return Response(serializer.data, status=status.HTTP_200_OK)
                except:
                    return Response({'msg': 'No attendance found in this date.'}, status=status.HTTP_404_NOT_FOUND)
            else:
                return Response({'msg': 'Unauthorized access!'}, status=status.HTTP_401_UNAUTHORIZED)
        except:
            return Response({'msg': 'Lecture unavailable!'}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, idDate, format=None):
        user = request.user
        data = self.request.data
        idAndDate = idDate.split('-')
        lectureId = int(idAndDate[0])
        date = str(idAndDate[1]+'/'+idAndDate[2]+'/'+idAndDate[3])
        attendanceDate = datetime.datetime.strptime(date, "%Y/%m/%d")
        attendances = data['attendance']
        try:
            userProfile = UserProfile.objects.get(user=user)
            requestedTeacher = Teacher.objects.get(user=user, userProfile=userProfile)
            lecture = Lecture.objects.get(id=lectureId)
            if userProfile.role.type == "Teacher" and (lecture.teacher==requestedTeacher or lecture.teacher2==requestedTeacher):
                try:
                    presentStudents = Student.objects.filter(id__in=attendances)
                    allStudents = Student.objects.filter(cLass=lecture.cLass)
                    absentStudents = allStudents.exclude(id__in=presentStudents)
                    try:
                        with transaction.atomic():
                            for i in presentStudents:
                                student = Student.objects.get(id=i.id)
                                attendance = Attendance.objects.get(lecture=lecture, date=attendanceDate, student=student)
                                attendance.status = True
                                attendance.save()
                            for i in absentStudents:
                                student = Student.objects.get(id=i.id)
                                attendance = Attendance.objects.get(lecture=lecture, date=attendanceDate, student=student)
                                attendance.status = False
                                attendance.save()
                            return Response({'msg': 'Attendance edited successfully!'}, status=status.HTTP_200_OK)
                    except:
                        return Response({'msg': 'Database error!'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                except:
                    return Response({'msg': 'No attendance found in this date.'}, status=status.HTTP_404_NOT_FOUND)
            else:
                return Response({'msg': 'Unauthorized access!'}, status=status.HTTP_401_UNAUTHORIZED)
        except:
            return Response({'msg': 'Lecture unavailable!'}, status=status.HTTP_404_NOT_FOUND)
        

@method_decorator(csrf_protect, name='dispatch')
class ViewStudentAttendance(APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def get(self, request, sem, format=None):
        user = request.user
        try:
            userProfile = UserProfile.objects.get(user=user)
            if userProfile.role.type == "Student":
                student = Student.objects.get(user=user, userProfile=userProfile)
                context = {"student_id": student.id}
                lectures = Lecture.objects.filter(cLass=student.cLass, semester=sem)
                serializer = ViewStudentAttendanceSerializer(lectures, many=True, context=context)
                return Response(serializer.data, status=status.HTTP_200_OK)
            elif userProfile.role.type == "Parent":
                parent = Parent.objects.get(user=user, userProfile=userProfile)
                student = parent.parentOf
                context = {"student_id": student.id}
                lectures = Lecture.objects.filter(cLass=student.cLass, semester=sem)
                serializer = ViewStudentAttendanceSerializer(lectures, many=True, context=context)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({'msg': 'Unauthorized access!'}, status=status.HTTP_401_UNAUTHORIZED)
        except:
            return Response({'msg': 'User details not found!'}, status=status.HTTP_404_NOT_FOUND)