from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator
from rest_framework import status
from wrcms.models import UserProfile, Student, Lecture, Teacher
from .models import LeaveRequest
from .serializers import LeaveRequestSerializer
from wrcms.serializers.attendance_serializers import LectureSerializer
from django.db.models import Q
import datetime

@method_decorator(csrf_protect, name='dispatch')
class RequestLeave(APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def get(self, request, format=None):
        user = request.user
        userProfile = UserProfile.objects.get(user=user)
        if userProfile.role.type == 'Student':
            student = Student.objects.get(user=user, userProfile=userProfile)
            lectures = Lecture.objects.filter(isArchived=False, cLass=student.cLass)
            serializer = LectureSerializer(lectures, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'msg': 'Not authorized to access.'}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, format=None):
        user = request.user
        data = self.request.data
        leaveFrom = data['leaveStartDate']
        leaveTo = data['leaveEndDate']
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
class GetLeaveRequests(APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def get(self, request, format=None):
        user = request.user
        userProfile = UserProfile.objects.get(user=user)
        if userProfile.role.type == 'Student':
            student = Student.objects.get(user=user, userProfile=userProfile)
            myrequests = LeaveRequest.objects.filter(student=student, is_archived=False)
            serializer = LeaveRequestSerializer(myrequests, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        if userProfile.role.type == 'Teacher':
            teacher = Teacher.objects.get(user=user, userProfile=userProfile)
            lectures = Lecture.objects.filter(Q(teacher=teacher, isArchived=False) | Q(teacher2=teacher, isArchived=False))
            requests = LeaveRequest.objects.filter(lecture__in = lectures)
            serializer = LeaveRequestSerializer(requests, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'msg': 'Not allowed to access'}, status=status.HTTP_401_UNAUTHORIZED)


@method_decorator(csrf_protect, name='dispatch')
class ApproveLeaveRequest(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, id, format=None):
        user = request.user
        userProfile = UserProfile.objects.get(user=user)
        if userProfile.role.type == 'Teacher':
            teacher = Teacher.objects.get(user=user, userProfile=userProfile)
            try:
                leaveRequest = LeaveRequest.objects.get(id=id)
                if leaveRequest.lecture.teacher == teacher or leaveRequest.lecture.teacher2==teacher:
                    leaveRequest.is_approved = True
                    leaveRequest.approvedBy = teacher
                    leaveRequest.approved_at = datetime.datetime.now()
                    leaveRequest.save()
                    return Response({'msg': 'Leave request approved successfully'}, status=status.HTTP_200_OK)
                else:
                    return Response({'msg': 'Not allowed to perform this action.'}, status=status.HTTP_401_UNAUTHORIZED)
            except:
                return Response({'msg': 'Leave request not found.'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'msg': 'Not allowed to perform this action.'}, status=status.HTTP_401_UNAUTHORIZED)
        

@method_decorator(csrf_protect, name='dispatch')
class DeleteLeaveRequest(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def delete(self, request, id, format=None):
        user = request.user
        userProfile = UserProfile.objects.get(user=user)
        if userProfile.role.type == 'Student':
            student = Student.objects.get(user=user, userProfile=userProfile)
            try:
                leaveRequest = LeaveRequest.objects.get(id=id)
                if leaveRequest.is_approved == False and leaveRequest.student == student:
                    leaveRequest.delete()
                    return Response({'msg': 'Leave request is deleted.'}, status=status.HTTP_200_OK)
                else:
                    return Response({'msg': "Not allowed to perform this action."}, status=status.HTTP_401_UNAUTHORIZED)
            except:
                return Response({'msg': 'Leave request not found.'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'msg': 'Not allowed to perform this action.'}, status=status.HTTP_401_UNAUTHORIZED)
        

@method_decorator(csrf_protect, name='dispatch')
class EditLeaveRequest(APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def put(self, request, id, format=None):
        user = request.user
        data = self.request.data
        try:
            leaveRequest = LeaveRequest.objects.get(id=id)
            student = Student.objects.get(user = user)
            if leaveRequest.student == student and leaveRequest.is_approved == False:
                leaveRequest.leaveStartDate = data['leaveStartDate']
                leaveRequest.leaveEndDate = data['leaveEndDate']
                leaveRequest.lecture = Lecture.objects.get(id=data['lecture'])
                leaveRequest.reason = data['reason']
                leaveRequest.save()
                return Response({'msg': 'Leave request edited successfully!'}, status=status.HTTP_200_OK)
            else:
                return Response({'msg': 'Not allowed to edit this leave request.'}, status=status.HTTP_401_UNAUTHORIZED)
        except:
            return Response({'msg': 'Lecture not found.'}, status=status.HTTP_404_NOT_FOUND)