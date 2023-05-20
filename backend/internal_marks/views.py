from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from wrcms.models import UserProfile, Teacher, Lecture, Student, ProgramSubject
from .models import InternalMark
from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator
from rest_framework import status
from wrcms.serializers.attendance_serializers import LectureSerializer, StudentSerializer
from wrcms_admin.serializers import SubjectSerializer
from django.db import transaction
from .serializers import LectureInternalMarkSerializer

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
                students = sorted(Student.objects.filter(cLass=lecture.cLass), key=lambda x:x.rollNumber[-3:])
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
        
    def post(self, request, id, format=None):
        user = request.user
        data = request.data
        try:
            userProfile = UserProfile.objects.get(user=user)
            requestedTeacher = Teacher.objects.get(user=user, userProfile=userProfile)
            lecture = Lecture.objects.get(id=id)
            subject = lecture.subject
            if userProfile.role.type == "Teacher" and (lecture.teacher==requestedTeacher or lecture.teacher2==requestedTeacher):
                marks = data['marks']
                try:
                    with transaction.atomic():
                        for mark in marks:
                            InternalMark.objects.create(
                                student = Student.objects.get(id=int(mark['id'])),
                                subject = subject,
                                theoryAssessment = int(mark['th']),
                                practicalAssessment = int(mark['pr']),
                                semester = ProgramSubject.objects.get(subject=subject, program=lecture.cLass.program).semester
                            )
                        if(subject.type == "Both"):
                            allLectures = Lecture.objects.filter(subject=subject, cLass=lecture.cLass)
                            for lec in allLectures:
                                lec.internalMarksAdded = True
                                lec.save()
                        else:
                            lecture.internalMarksAdded = True
                            lecture.save()
                        return Response({'msg': 'Internal marks added successfully.'}, status=status.HTTP_200_OK)
                except:
                    return Response({'msg': 'Database error!'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            else:
                return Response({'msg': 'Unauthorized to add marks.'}, status=status.HTTP_401_UNAUTHORIZED)
        except:
            return Response({'msg': 'Lecture unavailable.'}, status=status.HTTP_404_NOT_FOUND)
        

@method_decorator(csrf_protect, name='dispatch')
class ViewInternalMarks(APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def get(self, request, id, format=None):
        user = request.user
        try:
            userProfile = UserProfile.objects.get(user=user)
            lecture = Lecture.objects.get(id=id)
            if userProfile.role.type == "Teacher":
                teacher = Teacher.objects.get(user=user, userProfile=userProfile)
                if lecture.teacher==teacher or lecture.teacher2==teacher:
                    if (lecture.internalMarksAdded == True):
                        serializer = LectureInternalMarkSerializer(lecture, many=False)
                        return Response(serializer.data, status=status.HTTP_200_OK)
                    else:
                        return Response({'msg': 'No internal marks added.'}, status=status.HTTP_404_NOT_FOUND)
                else:
                    return Response({'msg': 'Unauthorized to view marks.'}, status=status.HTTP_401_UNAUTHORIZED)
            else:
                return Response({'msg': 'Unauthorized to view marks.'}, status=status.HTTP_401_UNAUTHORIZED)
        except:
            return Response({'msg': 'Lecture unavailable.'}, status=status.HTTP_404_NOT_FOUND)
