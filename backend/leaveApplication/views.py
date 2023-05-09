from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator
from rest_framework import status
from wrcms.models import UserProfile, Student, Lecture
from .models import LeaveRequest

@method_decorator(csrf_protect, name='dispatch')
class RequestLeave(APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def post(self, request, format=None):
        user = request.user
        data = self.request.data
        leaveFrom = data['leaveFrom']
        leaveTo = data['leaveTo']
        lectureId = data['lecture']
        reason = data['reason']
        userProfile = UserProfile.objects.get(user=user)
        if userProfile.role.type == 'Student':
            student = Student.objects.get(user=user, userProfile=userProfile)
            try:
                lecture = Lecture.objects.get(id=lectureId, cLass=student.cLass)
                if(lecture.cLass != student.cLass):
                    return Response({'msg': 'Inappropriate relation between student and lecture.'}, status=status.HTTP_400_BAD_REQUEST)
                LeaveRequest.objects.create(
                    leaveStartDate=leaveFrom,
                    leaveEndDate = leaveTo,
                    student = student,
                    lecture = lecture,
                    reason = reason
                )
                return Response({'msg': 'Leave request submitted successfully.'}, status=status.HTTP_200_OK)
            except:
                return Response({'msg': 'Lecture not found.'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'msg': 'No privilege to request leave.'}, status=status.HTTP_400_BAD_REQUEST)
        

@method_decorator(csrf_protect, name='dispatch')
class RequestLeave(APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def post(self, request, format=None):
        user = request.user
        data = self.request.data