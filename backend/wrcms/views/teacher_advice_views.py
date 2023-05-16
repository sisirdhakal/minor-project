from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from wrcms.models import UserProfile, Teacher, Student, Lecture, TeacherAdvice
from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator
from rest_framework import status
from ..serializers.teacher_advice_serializers import *

@method_decorator(csrf_protect, name='dispatch')
class AdviceList(APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def get(self, request, format=None):
        user = request.user
        userProfile = UserProfile.objects.get(user=user)
        if userProfile.role.type == 'Teacher':
            teacher = Teacher.objects.get(user=user, userProfile=userProfile)
            allAdvices = TeacherAdvice.objects.filter(teacher=teacher)
            serializer = TeacherAdviceSerializer(allAdvices, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        elif userProfile.role.type == 'Student':
            student = Student.objects.get(user=user, userProfile=userProfile)
            allAdvices = TeacherAdvice.objects.filter(student=student)
            serializer = TeacherAdviceSerializer(allAdvices, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'msg': 'Not allowed to access.'}, status=status.HTTP_401_UNAUTHORIZED)


@method_decorator(csrf_protect, name='dispatch')
class AdviceAdd(APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def post(self, request, format=None):
        user = request.user
        data = request.data
        userProfile = UserProfile.objects.get(user=user)
        if userProfile.role.type == 'Teacher':
            teacher = Teacher.objects.get(user=user, userProfile=userProfile)
            lecture = Lecture.objects.get(id=data['lecture'])
            if (lecture.teacher==teacher or lecture.teacher2==teacher):
                TeacherAdvice.objects.create(
                    advice = data['advice'],
                    teacher = teacher,
                    student = Student.objects.get(id=data['student']),
                    lecture = lecture
                )
                return Response({'msg': 'Advice posted successfully.'}, status=status.HTTP_200_OK)
            else:
                return Response({'msg': 'Not allowed to add advice about this lecture.'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({'msg': 'Not allowed to add advice.'}, status=status.HTTP_401_UNAUTHORIZED)
        
@method_decorator(csrf_protect, name='dispatch')
class AdviceEdit(APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def put(self, request, id, format=None):
        user = request.user
        data = request.data
        userProfile = UserProfile.objects.get(user=user)
        if userProfile.role.type == 'Teacher':
            teacher = Teacher.objects.get(user=user, userProfile=userProfile)
            try:
                advice = TeacherAdvice.objects.get(id=id)
                lecture = Lecture.objects.get(id=data['lecture'])
                if ((lecture.teacher==teacher or lecture.teacher2==teacher) and advice.teacher==teacher):
                    advice.advice = data['advice']
                    advice.student = Student.objects.get(id=data['student'])
                    advice.lecture = lecture
                    advice.save()
                    return Response({'msg': 'Advice edited successfully.'}, status=status.HTTP_200_OK)
                else:
                    return Response({'msg': 'Not allowed to edit advice.'}, status=status.HTTP_401_UNAUTHORIZED)
            except:
                return Response({'msg': 'Teacher advice not found.'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'msg': 'Not allowed to access.'}, status=status.HTTP_401_UNAUTHORIZED)
        
@method_decorator(csrf_protect, name='dispatch')
class AdviceDelete(APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def delete(self, request, id, format=None):
        user = request.user
        userProfile = UserProfile.objects.get(user=user)
        if userProfile.role.type == 'Teacher':
            teacher = Teacher.objects.get(user=user, userProfile=userProfile)
            try:
                advice = TeacherAdvice.objects.get(id=id)
                if (advice.teacher==teacher):
                    advice.delete()
                    return Response({'msg': 'Advice deleted.'}, status=status.HTTP_200_OK)
                else:
                    return Response({'msg': 'Not allowed to delete advice.'}, status=status.HTTP_401_UNAUTHORIZED)
            except:
                return Response({'msg': 'Teacher advice not found.'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'msg': 'Not allowed to access'}, status=status.HTTP_401_UNAUTHORIZED)
        

        


