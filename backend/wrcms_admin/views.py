from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator
from rest_framework import status
from django.db.models import Q
import datetime
from wrcms.models import Batch, Department, Program, Class, Lecture, Subject, Student, Teacher
from .serializers import *

@method_decorator(csrf_protect, name='dispatch')
class BatchList(APIView):
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser,)

    def get(self, request, format=None):
        batches = Batch.objects.filter(graduated=False)
        serializer = BatchSerializer(batches, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

@method_decorator(csrf_protect, name='dispatch')
class ClassList(APIView):
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser,)

    def get(self, request, format=None):
        batches = Batch.objects.filter(graduated=False)
        classes = Class.objects.filter(batch__in = batches)
        serializer = ClassSerializer(classes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
@method_decorator(csrf_protect, name='dispatch')
class ClassAdd(APIView):
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser,)
    
    def post(self, request, format=None):
        data = self.request.data
        Class.objects.create(
            name = data['name'],
            department = Department.objects.get(id=data['department']),
            batch = Batch.objects.get(id=data['batch']),
            program = Program.objects.get(id=data['program']),
            semester = data['semester']
        )
        return Response({'msg': 'Class added successfully.'}, status=status.HTTP_200_OK)
    
@method_decorator(csrf_protect, name='dispatch')
class ClassEdit(APIView):
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser,)
    
    def put(self, request, id, format=None):
        data = self.request.data
        cLass = Class.objects.get(id=id)
        cLass.name = data['name']
        cLass.department = Department.objects.get(id=data['department'])
        cLass.batch = Batch.objects.get(id=data['batch'])
        cLass.program = Program.objects.get(id=data['program'])
        cLass.semester = data['semester']
        if (data['cr']):
            cLass.classRepresentative = Student.objects.get(id=data['cr'])
        if (data['vcr']):
            cLass.viceClassRepresentative = Student.objects.get(id=data['vcr'])
        cLass.save()
        return Response({'msg': 'Class edited successfully.'}, status=status.HTTP_200_OK)
    
@method_decorator(csrf_protect, name='dispatch')
class ClassDelete(APIView):
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser,)
    
    def delete(self, request, id, format=None):
        cLass = Class.objects.get(id=id)
        cLass.delete()
        return Response({'msg': 'Class deleted successfully.'}, status=status.HTTP_200_OK)
