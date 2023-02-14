from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from django.contrib.auth.models import User
from wrcms.models import UserProfile, Student, UserRole, Parent, Teacher, Lecture
from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator
from rest_framework import status
from ..serializers import LectureSerializer, StudentSerializer

@method_decorator(csrf_protect, name='dispatch')
class GetLectures(APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def get(self, request, format=None):
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


class GetAllStudentsForAttendance(APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def get(self, request, id, format=None):
        user = request.user
        try:
            userProfile = UserProfile.objects.get(user=user)
            requestedTeacher = Teacher.objects.get(user=user, userProfile=userProfile)
            lecture = Lecture.objects.get(id=id)
            if userProfile.role.type == "Teacher" and lecture.teacher==requestedTeacher:
                allStudents = Student.objects.extra(select={'str_rollNumber':'SUBSTRING("rollNumber",7,3)'}).order_by('str_rollNumber')
                # print(allStudents)
                # sorted(Student.objects.filter(cLass=lecture.cLass),key=lambda o:len(o.name),reverse=True)
                # return Response({'msg': 'Unauthorized access!'})
                serializer = StudentSerializer(allStudents, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({'msg': 'Unauthorized access!'}, status=status.HTTP_401_UNAUTHORIZED)
        except:
            return Response({'msg': 'Lecture unavailable!'}, status=status.HTTP_404_NOT_FOUND)

        