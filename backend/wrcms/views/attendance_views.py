from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from wrcms.models import UserProfile, Teacher, Lecture, PracticalClass, Attendance, Student
from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator
from rest_framework import status
from ..serializers.attendance_serializers import LectureSerializer, PracticalClassSerializer, LectureDetailSerializer, LectureAttendanceSerializer
from django.db.models import Q
import datetime
from django.db import transaction

@method_decorator(csrf_protect, name='dispatch')
class GetLectures(APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def get(self, request, format=None):
        print(request.headers)
        user = request.user
        userProfile = UserProfile.objects.get(user=user)
        if userProfile.role.type == "Teacher":
            try:
                teacher = Teacher.objects.get(user=user, userProfile=userProfile)
                lectures = Lecture.objects.filter(teacher=teacher, isArchived=False)
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
                practicals = PracticalClass.objects.filter(Q(teacherOne=teacher, isArchived=False) | Q(teacherTwo=teacher, isArchived=False))
                serializer = PracticalClassSerializer(practicals, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except:
                return Response({'msg': 'No records found!'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'msg': 'Unauthorized access!'}, status=status.HTTP_401_UNAUTHORIZED)


@method_decorator(csrf_protect, name='dispatch')
class LectureDetailForAttendance(APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def get(self, request, id, format=None):
        user = request.user
        try:
            userProfile = UserProfile.objects.get(user=user)
            requestedTeacher = Teacher.objects.get(user=user, userProfile=userProfile)
            lecture = Lecture.objects.get(id=id)
            if userProfile.role.type == "Teacher" and lecture.teacher==requestedTeacher:
                serializer = LectureDetailSerializer(lecture, many=False)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({'msg': 'Unauthorized access!'}, status=status.HTTP_401_UNAUTHORIZED)
        except:
            return Response({'msg': 'Lecture unavailable!'}, status=status.HTTP_404_NOT_FOUND)


@method_decorator(csrf_protect, name='dispatch')
class AddAttendance(APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def post(self, request, format=None):
        user = request.user
        data = self.request.data
        lectureId = data['lecture_id']
        date = data['date']
        attendanceDate = datetime.datetime.strptime(date, "%Y/%m/%d")
        attendances = data['attendance']
        if attendances and len(attendances)==0:
            return Response({'msg': 'No attendance data'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            try:
                lecture = Lecture.objects.get(id=lectureId)
                userProfile = UserProfile.objects.get(user=user)
                requestedTeacher = Teacher.objects.get(user=user, userProfile=userProfile)
                if userProfile.role.type == "Teacher" and lecture.teacher==requestedTeacher:
                    presentStudents = Student.objects.filter(id__in=attendances)
                    allStudents = Student.objects.filter(cLass=lecture.cLass)
                    absentStudents = allStudents.exclude(id__in=presentStudents)
                    try:
                        with transaction.atomic():
                            for i in presentStudents:
                                Attendance.objects.create(
                                    lecture = lecture,
                                    cLass = lecture.cLass,
                                    student = Student.objects.get(id=i.id),
                                    status = True,
                                    date = attendanceDate
                                )
                            for i in absentStudents:
                                Attendance.objects.create(
                                    lecture = lecture,
                                    cLass = lecture.cLass,
                                    student = Student.objects.get(id=i.id),
                                    status = False,
                                    date = attendanceDate
                                )
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
            if userProfile.role.type == "Teacher" and lecture.teacher==requestedTeacher:
                serializer = LectureAttendanceSerializer(lecture, many=False)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({'msg': 'Unauthorized access!'}, status=status.HTTP_401_UNAUTHORIZED)
        except:
            return Response({'msg': 'Lecture unavailable!'}, status=status.HTTP_404_NOT_FOUND)
        