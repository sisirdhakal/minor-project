from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from wrcms.models import UserProfile, Teacher, Student, Parent, Lecture, Attendance
from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator
from rest_framework import status
import requests


@method_decorator(csrf_protect, name='dispatch')
class Dashboard(APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def get(self, request, format=None):
        user = request.user
        try:
            userProfile = UserProfile.objects.get(user=user)
            if userProfile.role.type == "Student":
                student = Student.objects.get(user=user, userProfile=userProfile)
                try:
                    res = requests.get('http://127.0.0.1:8001/api/books/'+student.rollNumber)
                    data = res.json()
                except:
                    data = []
                totalWorkingDays = 0
                totalPresentDays = 0
                lectures = Lecture.objects.filter(cLass=student.cLass, semester=student.cLass.semester)
                for lecture in lectures:
                    presentCount = Attendance.objects.filter(lecture=lecture, student=student, status=True).count()
                    totalPresentDays += int(presentCount)
                    totalWorkingDays += int(lecture.totalLectureDays)
                content = {
                    'libraryData': data,
                    'presentDays': totalPresentDays,
                    'lectureDays': totalWorkingDays,
                    'presentPercentage': int(totalPresentDays/totalWorkingDays*100)
                }
                return Response(content, status=status.HTTP_200_OK)
            elif userProfile.role.type == "Parent":
                parent = Parent.objects.get(user=user, userProfile=userProfile)
                student = parent.parentOf
                totalWorkingDays = 0
                totalPresentDays = 0
                lectures = Lecture.objects.filter(cLass=student.cLass, semester=student.cLass.semester)
                for lecture in lectures:
                    presentCount = Attendance.objects.filter(lecture=lecture, student=student, status=True).count()
                    totalPresentDays += int(presentCount)
                    totalWorkingDays += int(lecture.totalLectureDays)
                content = {
                    'presentDays': totalPresentDays,
                    'lectureDays': totalWorkingDays,
                    'presentPercentage': int(totalPresentDays/totalWorkingDays*100)
                }
                return Response(content, status=status.HTTP_200_OK)
            else:
                return Response({'msg': 'Unauthorized to access.'}, status=status.HTTP_401_UNAUTHORIZED)
        except:
            return Response({'msg': 'Error while fetching data.'}, status=status.HTTP_404_NOT_FOUND)