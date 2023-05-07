from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from wrcms.models import UserProfile, Teacher, Student, Routine
from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator
from rest_framework import status
from ..serializers.routine_serializers import RoutineSerializer

@method_decorator(csrf_protect, name='dispatch')
class GetRoutine(APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def get(self, request, format=None):
        user = request.user
        userProfile = UserProfile.objects.get(user=user)
        if userProfile.role.type == "Student":
            student = Student.objects.get(user=user, userProfile=userProfile)
            try:
                routine = Routine.objects.get(routineType="classRoutine", routineFor=student.cLass.name)
                serializer = RoutineSerializer(routine, many=False)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except:
                return Response({'msg': 'Routine not found!'}, status=status.HTTP_404_NOT_FOUND)
        elif userProfile.role.type == "Teacher":
            teacher = Teacher.objects.get(user=user, userProfile=userProfile)
            try:
                routine = Routine.objects.get(routineType="classRoutine", routineFor=teacher.userProfile.getFullName())
                serializer = RoutineSerializer(routine, many=False)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except:
                return Response({'msg': 'Routine not found!'}, status=status.HTTP_404_NOT_FOUND)
        else:
            allRoutines = Routine.objects.all()
            serializer = RoutineSerializer(allRoutines, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)