from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import UserProfile, Student, UserRole, Parent
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator

# Create your views here.
@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        return Response({ 'success': 'CSRF Cookie set'})

@method_decorator(csrf_protect, name='dispatch')
class ParentVerification(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = request.data
        studentName = data['studentName']
        idType = data['idType']
        idNumber = data['idNumber']
        dobStudent = data['dobStudent']
        splitStudentName = studentName.split(" ")
        role = UserRole.objects.get(type='Student')
        try:
            if (len(splitStudentName) == 3):
                userProfile = UserProfile.objects.get(
                    firstName=splitStudentName[0],
                    middleName=splitStudentName[1],
                    lastName=splitStudentName[2],
                    identificationDocumentType = idType,
                    identificationDocumentNumber = idNumber,
                    dateOfBirth = dobStudent
                )
                if (userProfile is not None and userProfile.role==role):
                    student = Student.objects.get(userProfile=userProfile)
                    if (student.isParentRegistered == True):
                        return Response({'success': 'Parents already registered'})
                    else:
                        return Response({'success': 'Student Verified', 'student': student.id})
            else:
                userProfile = UserProfile.objects.get(
                    firstName=splitStudentName[0],
                    lastName=splitStudentName[1],
                    identificationDocumentType = idType,
                    identificationDocumentNumber = idNumber,
                    dateOfBirth = dobStudent
                )
                if (userProfile is not None and userProfile.role==role):
                    student = Student.objects.get(userProfile=userProfile)
                    return Response({'success': 'Student Verified', 'student': student.id})
        except:
            return Response({'error': 'No student found with given details'})


@method_decorator(csrf_protect, name='dispatch')
class ParentSignUp(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = request.data
        courtesyTitle = data['courtesyTitle']
        parentName = data['parentName']
        address = data['address']
        contactNumber = data['contactNumber']
        email = data['email']
        password = data['password']
        confirmPassword = data['confirmPassword']
        studentId = data['studentId']

        splitParentName = parentName.split(" ")
        student = Student.objects.get(id=studentId)
        if password == confirmPassword:
            if User.objects.filter(username=email).exists():
                return Response({'error': 'Email is already registered.'})
            else:
                user = User.objects.create_user(username=email, email=email, password=password)
                user.save()
                if (len(splitParentName) == 3):
                    userProfile = UserProfile.objects.create(
                        user = user,
                        courtesyTitle = courtesyTitle,
                        firstName = splitParentName[0],
                        middleName = splitParentName[1],
                        lastName = splitParentName[2],
                        address = address,
                        contact = contactNumber,
                        role = UserRole.objects.get(type='Parent')
                    )
                    Parent.objects.create(
                        user = user,
                        userProfile = userProfile,
                        parentOf = student
                    )
                    student.isParentRegistered = True
                    student.save()
                    return Response({'error': 'Signed up successfully.'})
                else:
                    userProfile = UserProfile.objects.create(
                        user = user,
                        courtesyTitle = courtesyTitle,
                        firstName = splitParentName[0],
                        lastName = splitParentName[1],
                        address = address,
                        contact = contactNumber,
                        role = UserRole.objects.get(type='Parent')
                    )
                    Parent.objects.create(
                        user = user,
                        userProfile = userProfile,
                        parentOf = student
                    )
                    student.isParentRegistered = True
                    student.save()
                    return Response({'error': 'Signed up successfully.'})
        else:
            return Response({'error': 'Passwords do not match'})