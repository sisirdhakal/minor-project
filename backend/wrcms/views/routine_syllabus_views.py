from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from wrcms.models import UserProfile, Teacher, Student, Routine, Program
from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator
from rest_framework import status
from ..serializers.routine_syllabus_serializers import RoutineSerializer, SyllabusSerializer

@method_decorator(csrf_protect, name='dispatch')
class GetRoutine(APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def get(self, request, format=None):
        user = request.user
        userProfile = UserProfile.objects.get(user=user)
        if userProfile.role.type == "Student":
            student = Student.objects.get(user=user, userProfile=userProfile)
            try:
                routine = Routine.objects.get(routineType="ClassRoutine", routineFor=student.cLass.name)
                serializer = RoutineSerializer(routine, many=False)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except:
                return Response({'msg': 'Routine not found!'}, status=status.HTTP_404_NOT_FOUND)
        elif userProfile.role.type == "Teacher":
            teacher = Teacher.objects.get(user=user, userProfile=userProfile)
            try:
                routine = Routine.objects.get(routineType="TeacherRoutine", routineFor=teacher.userProfile.getFullName())
                serializer = RoutineSerializer(routine, many=False)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except:
                return Response({'msg': 'Routine not found!'}, status=status.HTTP_404_NOT_FOUND)
        else:
            allRoutines = Routine.objects.all()
            serializer = RoutineSerializer(allRoutines, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        

@method_decorator(csrf_protect, name='dispatch')
class GetSyllabus(APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def get(self, request, format=None):
        user = request.user
        try:
            userProfile = UserProfile.objects.get(user=user)
            if userProfile.role.type == "Student":
                student = Student.objects.get(user=user, userProfile=userProfile)
                program = student.cLass.program
                serializer = SyllabusSerializer(program, many=False)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                programs = Program.objects.all()
                serializer = SyllabusSerializer(programs, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response({'msg': 'Error while fetching syllabus.'}, status=status.HTTP_400_BAD_REQUEST)
