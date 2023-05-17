from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator
from rest_framework import status
from django.db.models import Q
import datetime
from wrcms.models import Batch, Department, Program, Class, Lecture, Subject, Student, Teacher, ProgramSubject, UserProfile, UserRole, Parent, Routine
from .serializers import *

@method_decorator(csrf_protect, name='dispatch')
class Dashboard(APIView):
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser,)

    def get(self, request, format=None):
        students = Student.objects.filter(is_graduated=False)
        alumni_count = Student.objects.filter(is_graduated=True).count()
        parents_count = Parent.objects.filter(parentOf__in = students).count()
        students_count = students.count()
        graduated_batch_count = Batch.objects.filter(graduated=True).count()
        teachers_count = Teacher.objects.filter(is_working=True).count()
        departments_count = Department.objects.all().count()
        programs_count = Program.objects.all().count()
        context = {
            "students": students_count,
            "teachers": teachers_count,
            "departments": departments_count,
            "graduated_batches": graduated_batch_count,
            "programs": programs_count,
            "alumni": alumni_count,
            "parents": parents_count
        }
        return Response(context, status=status.HTTP_200_OK)

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
class BatchDetail(APIView):
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser,)

    def get(self, request, id, format=None):
        try:
            batch = Batch.objects.get(id=id)
            serializer = BatchSerializer(batch, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response({'msg': 'Batch not found.'}, status=status.HTTP_404_NOT_FOUND)
        
@method_decorator(csrf_protect, name='dispatch')
class BatchEdit(APIView):
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser,)
    
    def put(self, request, id, format=None):
        data = self.request.data
        try:
            batch = Batch.objects.get(id=id)
            batch.year = data['year']
            batch.startedFrom = data['startedFrom']
            batch.graduated = data['graduated']
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


# Class based views for CRUD operations of """Class""" model

@method_decorator(csrf_protect, name='dispatch')
class LectureList(APIView):
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser,)

    def get(self, request, format=None):
        lectures = Lecture.objects.filter(isArchived=False)
        serializer = LectureSerializer(lectures, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
@method_decorator(csrf_protect, name='dispatch')
class LectureAdd(APIView):
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser,)
    
    def post(self, request, format=None):
        data = self.request.data
        try:
            cLass = Class.objects.get(id=data['class'])
            subject = Subject.objects.get(id=data['subject'])
            programSubject = ProgramSubject.objects.get(program=cLass.program, subject=subject)
            lecture = Lecture.objects.create(
                subject = subject,
                type = data['type'],
                cLass = cLass,
                teacher = Teacher.objects.get(id=data['teacher']),
                semester = programSubject.semester,
            )
            if (data['teacher2']):
                lecture.teacher2 = Teacher.objects.get(id=data['teacher2'])
                lecture.save()
            return Response({'msg': 'Lecture added successfully.'}, status=status.HTTP_200_OK)
        except:
            return Response({'msg': 'Error while adding new lecture.'}, status=status.HTTP_409_CONFLICT)
        
@method_decorator(csrf_protect, name='dispatch')
class LectureEdit(APIView):
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser,)
    
    def put(self, request, id, format=None):
        data = self.request.data
        cLass = Class.objects.get(id=data['class'])
        subject = Subject.objects.get(id=data['subject'])
        programSubject = ProgramSubject.objects.get(program=cLass.program, subject=subject)
        try:
            lecture = Lecture.objects.get(id=id)
            lecture.subject = subject
            lecture.cLass = cLass
            lecture.type = data['type']
            lecture.semester = programSubject.semester
            lecture.teacher = Teacher.objects.get(id=data['teacher'])
            if (data['teacher2']):
                lecture.teacher2 = Teacher.objects.get(id=data['teacher2'])
            lecture.save()
            return Response({'msg': 'Lecture edited successfully.'}, status=status.HTTP_200_OK)
        except:
            return Response({'msg': 'Lecture not found.'}, status=status.HTTP_404_NOT_FOUND)
        
@method_decorator(csrf_protect, name='dispatch')
class LectureDelete(APIView):
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser,)
    
    def delete(self, request, id, format=None):
        try:
            lecture = Lecture.objects.get(id=id)
            lecture.delete()
            return Response({'msg': 'Lecture deleted successfully.'}, status=status.HTTP_200_OK)
        except:
            return Response({'msg': 'Lecture not found.'}, status=status.HTTP_404_NOT_FOUND)
        
# Class based views for CRUD operations of """Student""" model

@method_decorator(csrf_protect, name='dispatch')
class StudentList(APIView):
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser,)

    def get(self, request, format=None):
        search = self.request.query_params.get('search')
        if (search):
            search = search.split(' ')
            students = Student.objects.filter(
                Q(userProfile__firstName__in=search) |
                Q(userProfile__middleName__in=search) |
                Q(userProfile__lastName__in=search) |
                Q(rollNumber__in=search)
            )
        else:
            students = Student.objects.all()
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
@method_decorator(csrf_protect, name='dispatch')
class StudentAdd(APIView):
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser,)

    def post(self, request, format=None):
        data = self.request.data
        try:
            newUser = UserProfile.objects.create(
                courtesyTitle = data['courtesyTitle'],
                firstName = data['firstName'],
                middleName = data['middleName'],
                lastName = data['lastName'],
                email = data['email'],
                address = data['address'],
                contact = data['contact'],
                fathersName= data['fathersName'],
                mothersName = data['mothersName'],
                role = UserRole.objects.get(type="Student"),
                nationality = data['nationality'],
                identificationDocumentType = data['idType'],
                identificationDocumentNumber = data['idNumber'],
                dateOfBirth = data['dateOfBirth']
            )
            Student.objects.create(
                userProfile = newUser,
                department = Department.objects.get(id=data['department']),
                batch = Batch.objects.get(id=data['batch']),
                cLass = Class.objects.get(id=data['cLass']),
                rollNumber = data['rollNumber']
            )
            return Response({'msg': 'New student added successfully!'}, status=status.HTTP_200_OK)
        except:
            return Response({'msg': 'Error while adding new student. Make sure details are correct.'}, status=status.HTTP_400_BAD_REQUEST)
        
@method_decorator(csrf_protect, name='dispatch')
class StudentDetail(APIView):
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser,)

    def get(self, request, id, format=None):
        try:
            student = Student.objects.get(id=id)
            serializer = StudentSerializer(student, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response({'msg': 'Student not found.'}, status=status.HTTP_404_NOT_FOUND)
        
@method_decorator(csrf_protect, name='dispatch')
class StudentEdit(APIView):
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser,)

    def put(self, request, id, format=None):
        data = self.request.data
        try:
            student = Student.objects.get(id=id)
            userProfile = student.userProfile
            
            userProfile.courtesyTitle = data['courtesyTitle']
            userProfile.firstName = data['firstName']
            userProfile.middleName = data['middleName']
            userProfile.lastName = data['lastName']
            userProfile.email = data['email']
            userProfile.address = data['address']
            userProfile.contact = data['contact']
            userProfile.fathersName= data['fathersName']
            userProfile.mothersName = data['mothersName']
            userProfile.nationality = data['nationality']
            userProfile.identificationDocumentType = data['idType']
            userProfile.identificationDocumentNumber = data['idNumber']
            userProfile.dateOfBirth = data['dateOfBirth']
            
            userProfile.save()
            
            student.userProfile = userProfile
            student.department = Department.objects.get(id=data['department'])
            student.batch = Batch.objects.get(id=data['batch'])
            student.cLass = Class.objects.get(id=data['cLass'])
            student.rollNumber = data['rollNumber']

            student.save()
            return Response({'msg': 'Student details edited successfully!'}, status=status.HTTP_200_OK)
        except:
            return Response({'msg': 'Student not found.'}, status=status.HTTP_404_NOT_FOUND)
        
@method_decorator(csrf_protect, name='dispatch')
class StudentDelete(APIView):
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser,)
    
    def delete(self, request, id, format=None):
        try:
            student = Student.objects.get(id=id)
            userProfile = student.userProfile
            userProfile.delete()
            student.delete()
            return Response({'msg': 'Student deleted successfully.'}, status=status.HTTP_200_OK)
        except:
            return Response({'msg': 'Student not found.'}, status=status.HTTP_404_NOT_FOUND)


# Class based views for CRUD operations of """Teacher""" model

class TeacherList(APIView):
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser,)

    def get(self, request, format=None):
        search = self.request.query_params.get('search')
        if (search):
            search = search.split(' ')
            teachers = Teacher.objects.filter(
                Q(userProfile__firstName__in=search) |
                Q(userProfile__middleName__in=search) |
                Q(userProfile__lastName__in=search)
            )
        else:
            teachers = Teacher.objects.all()
        serializer = TeacherSerializer(teachers, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
@method_decorator(csrf_protect, name='dispatch')
class TeacherAdd(APIView):
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser,)

    def post(self, request, format=None):
        data = self.request.data
        try:
            newUser = UserProfile.objects.create(
                courtesyTitle = data['courtesyTitle'],
                firstName = data['firstName'],
                middleName = data['middleName'],
                lastName = data['lastName'],
                email = data['email'],
                address = data['address'],
                contact = data['contact'],
                fathersName= data['fathersName'],
                mothersName = data['mothersName'],
                role = UserRole.objects.get(type="Teacher"),
                nationality = data['nationality'],
                identificationDocumentType = data['idType'],
                identificationDocumentNumber = data['idNumber'],
                dateOfBirth = data['dateOfBirth']
            )
            Teacher.objects.create(
                userProfile = newUser,
                department = Department.objects.get(id=data['department']),
                academicDetails = data['academicDetails'],
                experiences = data['experiences'],
            )
            return Response({'msg': 'New teacher added successfully!'}, status=status.HTTP_200_OK)
        except:
            return Response({'msg': 'Error while adding new teacher. Make sure details are correct.'}, status=status.HTTP_400_BAD_REQUEST)
        
@method_decorator(csrf_protect, name='dispatch')
class TeacherDetail(APIView):
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser,)

    def get(self, request, id, format=None):
        try:
            teacher = Teacher.objects.get(id=id)
            serializer = TeacherSerializer(teacher, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response({'msg': 'Teacher not found.'}, status=status.HTTP_404_NOT_FOUND)

@method_decorator(csrf_protect, name='dispatch')
class TeacherEdit(APIView):
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser,)

    def put(self, request, id, format=None):
        data = self.request.data
        try:
            teacher = Teacher.objects.get(id=id)
            userProfile = teacher.userProfile
            
            userProfile.courtesyTitle = data['courtesyTitle']
            userProfile.firstName = data['firstName']
            userProfile.middleName = data['middleName']
            userProfile.lastName = data['lastName']
            userProfile.email = data['email']
            userProfile.address = data['address']
            userProfile.contact = data['contact']
            userProfile.fathersName= data['fathersName']
            userProfile.mothersName = data['mothersName']
            userProfile.nationality = data['nationality']
            userProfile.identificationDocumentType = data['idType']
            userProfile.identificationDocumentNumber = data['idNumber']
            userProfile.dateOfBirth = data['dateOfBirth']
            
            userProfile.save()
            
            teacher.userProfile = userProfile
            teacher.department = Department.objects.get(id=data['department'])
            teacher.academicDetails = data['academicDetails']
            teacher.experiences = data['experiences']

            teacher.save()
            return Response({'msg': 'Teacher details edited successfully!'}, status=status.HTTP_200_OK)
        except:
            return Response({'msg': 'Teacher not found.'}, status=status.HTTP_404_NOT_FOUND)

@method_decorator(csrf_protect, name='dispatch')
class TeacherDelete(APIView):
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser,)
    
    def delete(self, request, id, format=None):
        try:
            teacher = Teacher.objects.get(id=id)
            userProfile = teacher.userProfile
            userProfile.delete()
            teacher.delete()
            return Response({'msg': 'Teacher deleted successfully.'}, status=status.HTTP_200_OK)
        except:
            return Response({'msg': 'Teacher not found.'}, status=status.HTTP_404_NOT_FOUND)
        

# Class based views for CRUD operations of """Parent""" model

class ParentList(APIView):
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser,)

    def get(self, request, format=None):
        search = self.request.query_params.get('search')
        if (search):
            search = search.split(' ')
            parents = Parent.objects.filter(
                Q(userProfile__firstName__in=search) |
                Q(userProfile__middleName__in=search) |
                Q(userProfile__lastName__in=search) |
                Q(parentOf__rollNumber__in=search) |
                Q(parentOf__userProfile__firstName__in=search) |
                Q(parentOf__userProfile__middleName__in=search) |
                Q(parentOf__userProfile__lastName__in=search)
            ).distinct()
        else:
            parents = Parent.objects.all()
        serializer = ParentSerializer(parents, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

@method_decorator(csrf_protect, name='dispatch')
class ParentDetail(APIView):
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser,)

    def get(self, request, id, format=None):
        try:
            parent = Parent.objects.get(id=id)
            serializer = ParentSerializer(parent, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response({'msg': 'Parent not found.'}, status=status.HTTP_404_NOT_FOUND)


# Class based views for CRUD operations of """Routine""" model

class RoutineList(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        user = request.user
        if user.is_staff == True:
            allRoutines = Routine.objects.all()
            serializer = RoutineSerializer(allRoutines, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
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
                return Response({'msg': 'Not authorized to access.'}, status=status.HTTP_401_UNAUTHORIZED)
            
@method_decorator(csrf_protect, name='dispatch')
class RoutineAdd(APIView):
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser,)

    def post(self, request, format=None):
        data = self.request.data
        file = request.FILES.get('routine')
        try:
            if data['routineType'] == 'ClassRoutine':
                routineFor = Class.objects.get(id=data['routineFor']).name
            else:
                routineFor = Teacher.objects.get(id=data['routineFor']).userProfile.getFullName()
            Routine.objects.create(
                routineType = data['routineType'],
                routineFor = routineFor,
                information = data['information'],
                routineImage = file
            )
            return Response({'msg': 'New routine added successfully!'}, status=status.HTTP_200_OK)
        except:
            return Response({'msg': 'Error while adding new routine. Make sure details are correct.'}, status=status.HTTP_400_BAD_REQUEST)

@method_decorator(csrf_protect, name='dispatch')
class RoutineEdit(APIView):
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser,)

    def put(self, request, id, format=None):
        data = self.request.data
        file = request.FILES.get('routine')
        try:
            routine = Routine.objects.get(id=id)
            if data['routineType'] == 'ClassRoutine':
                routineFor = Class.objects.get(id=data['routineFor']).name
            else:
                routineFor = Teacher.objects.get(id=data['routineFor']).userProfile.getFullName()
            routine.routineType = data['routineType']
            routine.routineFor = routineFor
            routine.information = data['information']
            if (file):
                routine.routineImage = file
            routine.save()
            return Response({'msg': 'Routine details edited successfully!'}, status=status.HTTP_200_OK)
        except:
            return Response({'msg': 'Routine not found.'}, status=status.HTTP_404_NOT_FOUND)
        
@method_decorator(csrf_protect, name='dispatch')
class RoutineDelete(APIView):
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser,)
    
    def delete(self, request, id, format=None):
        try:
            routine = Routine.objects.get(id=id)
            routine.delete()
            return Response({'msg': 'Routine deleted successfully.'}, status=status.HTTP_200_OK)
        except:
            return Response({'msg': 'Routine not found.'}, status=status.HTTP_404_NOT_FOUND)

    
# Class based views for CRUD operations of """Syllabus""" model

class SyllabusList(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        user = request.user
        if user.is_staff == True:
            allSyllabus = Program.objects.all()
            serializer = ProgamSerializer(allSyllabus, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            userProfile = UserProfile.objects.get(user=user)
            if userProfile.role.type == "Student":
                student = Student.objects.get(user=user, userProfile=userProfile)
                try:
                    syllabus = student.cLass.program
                    serializer = ProgamSerializer(syllabus, many=False)
                    return Response(serializer.data, status=status.HTTP_200_OK)
                except:
                    return Response({'msg': 'Syllabus not found!'}, status=status.HTTP_404_NOT_FOUND)
            elif userProfile.role.type == "Teacher":
                teacher = Teacher.objects.get(user=user, userProfile=userProfile)
                try:
                    allSyllabus = Program.objects.all()
                    serializer = ProgamSerializer(allSyllabus, many=True)
                    return Response(serializer.data, status=status.HTTP_200_OK)
                except:
                    return Response({'msg': 'Syllabus not found!'}, status=status.HTTP_404_NOT_FOUND)
            else:
                return Response({'msg': 'Not authorized to access.'}, status=status.HTTP_401_UNAUTHORIZED)