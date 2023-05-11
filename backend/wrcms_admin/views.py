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

# Class based views for CRUD operations of """Batch""" model

@method_decorator(csrf_protect, name='dispatch')
class BatchList(APIView):
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser,)

    def get(self, request, format=None):
        batches = Batch.objects.filter(graduated=False)
        serializer = BatchSerializer(batches, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
@method_decorator(csrf_protect, name='dispatch')
class BatchAdd(APIView):
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser,)
    
    def post(self, request, format=None):
        data = self.request.data
        try:
            Batch.objects.create(
                year = data['year'],
                startedFrom = data['startedFrom']
            )
            return Response({'msg': 'Batch added successfully.'}, status=status.HTTP_200_OK)
        except:
            return Response({'msg': 'Error while adding new batch.'}, status=status.HTTP_409_CONFLICT)
        
@method_decorator(csrf_protect, name='dispatch')
class BatchEdit(APIView):
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser,)
    
    def put(self, request, id, format=None):
        data = self.request.data
        try:
            batch = Batch.objects.get(id=id)
            batch.year = data['year']
            batch.startedFrom = data['startedFrom']
            batch.save()
            return Response({'msg': 'Batch edited successfully.'}, status=status.HTTP_200_OK)
        except:
            return Response({'msg': 'Batch not found.'}, status=status.HTTP_404_NOT_FOUND)
    
@method_decorator(csrf_protect, name='dispatch')
class BatchDelete(APIView):
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser,)
    
    def delete(self, request, id, format=None):
        try:
            batch = Batch.objects.get(id=id)
            batch.delete()
            return Response({'msg': 'Batch deleted successfully.'}, status=status.HTTP_200_OK)
        except:
            return Response({'msg': 'Batch not found.'}, status=status.HTTP_404_NOT_FOUND)


# Class based views for CRUD operations of """Department""" model

@method_decorator(csrf_protect, name='dispatch')
class DepartmentList(APIView):
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser,)

    def get(self, request, format=None):
        departments = Department.objects.all()
        serializer = DepartmentSerializer(departments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
@method_decorator(csrf_protect, name='dispatch')
class DepartmentAdd(APIView):
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser,)
    
    def post(self, request, format=None):
        data = self.request.data
        try:
            Department.objects.create(
                name = data['name'],
                description = data['description'],
                contact = data['contact'],
                mail = data['mail']
            )
            return Response({'msg': 'Department added successfully.'}, status=status.HTTP_200_OK)
        except:
            return Response({'msg': 'Error while adding new department.'}, status=status.HTTP_409_CONFLICT)

@method_decorator(csrf_protect, name='dispatch')
class DepartmentEdit(APIView):
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser,)
    
    def put(self, request, id, format=None):
        data = self.request.data
        try:
            department = Department.objects.get(id=id)
            department.name = data['name']
            department.description = data['description']
            department.contact = data['contact']
            department.mail = data['mail']
            if (data['hod']):
                department.headOfDepartment = Teacher.objects.get(id=data['hod'])
            if (data['dhod']):
                department.deputyHeadOfDepartment = Teacher.objects.get(id=data['dhod'])
            department.save()
            return Response({'msg': 'Department edited successfully.'}, status=status.HTTP_200_OK)
        except:
            return Response({'msg': 'Department not found.'}, status=status.HTTP_404_NOT_FOUND)

@method_decorator(csrf_protect, name='dispatch')
class DepartmentDelete(APIView):
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser,)
    
    def delete(self, request, id, format=None):
        try:
            department = Department.objects.get(id=id)
            department.delete()
            return Response({'msg': 'Department deleted successfully.'}, status=status.HTTP_200_OK)
        except:
            return Response({'msg': 'Department not found.'}, status=status.HTTP_404_NOT_FOUND)


# Class based views for CRUD operations of """Program""" model

@method_decorator(csrf_protect, name='dispatch')
class ProgramList(APIView):
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser,)

    def get(self, request, format=None):
        programs = Program.objects.all()
        serializer = ProgamSerializer(programs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
@method_decorator(csrf_protect, name='dispatch')
class ProgramAdd(APIView):
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser,)
    
    def post(self, request, format=None):
        data = self.request.data
        file = request.FILES.get('syllabus')
        try:
            Program.objects.create(
                name = data['name'],
                department = Department.objects.get(id=data['department']),
                syllabus = file
            )
            return Response({'msg': 'Program added successfully.'}, status=status.HTTP_200_OK)
        except:
            return Response({'msg': 'Error while adding new program.'}, status=status.HTTP_409_CONFLICT)
        
@method_decorator(csrf_protect, name='dispatch')
class ProgramEdit(APIView):
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser,)
    
    def put(self, request, id, format=None):
        data = self.request.data
        file = request.FILES.get('syllabus')
        try:
            program = Program.objects.get(id=id)
            program.name = data['name']
            program.department = Department.objects.get(id=data['department'])
            if (file):
                program.syllabus = file
            program.save()
            return Response({'msg': 'Program edited successfully.'}, status=status.HTTP_200_OK)
        except:
            return Response({'msg': 'Program not found.'}, status=status.HTTP_404_NOT_FOUND)
        
@method_decorator(csrf_protect, name='dispatch')
class ProgramDelete(APIView):
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser,)
    
    def delete(self, request, id, format=None):
        try:
            program = Program.objects.get(id=id)
            program.delete()
            return Response({'msg': 'Program deleted successfully.'}, status=status.HTTP_200_OK)
        except:
            return Response({'msg': 'Program not found.'}, status=status.HTTP_404_NOT_FOUND)


# Class based views for CRUD operations of """Class""" model

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
        try:
            Class.objects.create(
                name = data['name'],
                department = Department.objects.get(id=data['department']),
                batch = Batch.objects.get(id=data['batch']),
                program = Program.objects.get(id=data['program']),
                semester = data['semester']
            )
            return Response({'msg': 'Class added successfully.'}, status=status.HTTP_200_OK)
        except:
            return Response({'msg': 'Error while adding new class.'}, status=status.HTTP_409_CONFLICT)
    
@method_decorator(csrf_protect, name='dispatch')
class ClassEdit(APIView):
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser,)
    
    def put(self, request, id, format=None):
        data = self.request.data
        try:
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
        except:
            return Response({'msg': 'Class not found.'}, status=status.HTTP_404_NOT_FOUND)
    
@method_decorator(csrf_protect, name='dispatch')
class ClassDelete(APIView):
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser,)
    
    def delete(self, request, id, format=None):
        try:
            cLass = Class.objects.get(id=id)
            cLass.delete()
            return Response({'msg': 'Class deleted successfully.'}, status=status.HTTP_200_OK)
        except:
            return Response({'msg': 'Class not found.'}, status=status.HTTP_404_NOT_FOUND)
