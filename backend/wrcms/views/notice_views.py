from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from wrcms.models import UserProfile, Teacher, Student, Class, Department, Lecture
from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator
from rest_framework import status
from django.db.models import Q
from django.db import transaction
from ..serializers.notice_serializers import ClassSerializer, DepartmentSerializer


@method_decorator(csrf_protect, name='dispatch')
class AddNotice(APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def get(self, request, format=None):
        user = request.user
        try:
            userProfile = UserProfile.objects.get(user=user)
            if userProfile.role.type == "Student":
                student = Student.objects.get(user=user, userProfile=userProfile)
                if student==student.cLass.classRepresentative or student==student.cLass.viceClassRepresentative:
                    cLass = student.cLass
                    serializer = ClassSerializer(cLass, many=False)
                    return Response({'class': serializer.data}, status=status.HTTP_200_OK)
                else:
                    return Response({'msg': 'You are not authorized to add notice.'}, status=status.HTTP_401_UNAUTHORIZED)
            elif userProfile.role.type == "Teacher":
                teacher = Teacher.objects.get(user=user, userProfile=userProfile)
                if teacher==teacher.department.headOfDepartment or teacher==teacher.department.deputyHeadOfDepartment:
                    department = teacher.department
                    deptSerializer = DepartmentSerializer(department, many=False)
                    lectures = Lecture.objects.filter(teacher=teacher).only('cLass_id')
                    classes = Class.objects.filter(id__in=lectures)
                    classSerializer = ClassSerializer(classes, many=True)
                    return Response({'department': deptSerializer.data, 'class': classSerializer.data}, status=status.HTTP_200_OK)
                else:
                    lectures = Lecture.objects.filter(teacher=teacher).only('cLass_id')
                    classes = Class.objects.filter(id__in=lectures)
                    classSerializer = ClassSerializer(classes, many=True)
                    return Response({'class': classSerializer.data}, status=status.HTTP_200_OK)
            else:
                return Response({'msg': 'You are not authorized to add notice.'}, status=status.HTTP_401_UNAUTHORIZED)
        except:
            return Response({'msg': 'Error while fetching data.'}, status=status.HTTP_404_NOT_FOUND)
        
    def post(self, request, format=None):
        user = request.user
        return Response({'msg': 'Add Notice'}, status=status.HTTP_200_OK)