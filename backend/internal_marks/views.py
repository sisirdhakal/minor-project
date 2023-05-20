from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from wrcms.models import UserProfile, Teacher, Lecture, Student
from .models import InternalMark
from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator
from rest_framework import status
from wrcms.serializers.attendance_serializers import LectureSerializer
from wrcms_admin.serializers import SubjectSerializer
from wrcms_admin.serializers import StudentSerializer
from django.db.models import Q

@method_decorator(csrf_protect, name='dispatch')
class AddInternalMarks(APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def get(self, request, id, format=None):
        user = request.user
        try:
            userProfile = UserProfile.objects.get(user=user)
            requestedTeacher = Teacher.objects.get(user=user, userProfile=userProfile)
            lecture = Lecture.objects.get(id=id)
            subject = lecture.subject
            if userProfile.role.type == "Teacher" and (lecture.teacher==requestedTeacher or lecture.teacher2==requestedTeacher):
                students = Student.objects.filter(cLass=lecture.cLass)
                studentSerializer = StudentSerializer(students, many=True)
                lectureSerializer = LectureSerializer(lecture, many=False)
                subjectSerializer = SubjectSerializer(subject, many=False)
                context = {
                    'subject': subjectSerializer.data,
                    'lecture': lectureSerializer.data,
                    'students': studentSerializer.data
                }
                return Response(context, status=status.HTTP_200_OK)
            else:
                return Response({'msg': 'Unauthorized access!'}, status=status.HTTP_401_UNAUTHORIZED)
        except:
            return Response({'msg': 'Lecture unavailable!'}, status=status.HTTP_404_NOT_FOUND)
