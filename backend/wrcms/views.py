from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import UserProfile, Student, UserRole, Parent
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator
from django.contrib.auth import authenticate, login
from rest_framework import status

# Create your views here.
@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        return Response({ 'msg': 'CSRF Cookie set'})


@method_decorator(csrf_protect, name='dispatch')
class CheckAuthenticated(APIView):
    def get(self, request, format=None):
        isAuthenticated = User.is_authenticated
        if isAuthenticated:
            return Response({'isAuthenticated': True})
        else:
            return Response({'isAuthenticated': False})


@method_decorator(csrf_protect, name='dispatch')
class ParentVerification(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = request.data
        studentName = data['text']
        idType = data['idType']
        idNumber = data['idNumber']
        dobStudent = data['dobStudent']
        splitStudentName = studentName.split(" ")
        role = UserRole.objects.get(type='Student')
        try:
            if (len(splitStudentName) == 3):
                userProfile = UserProfile.objects.get(
                    firstName__iexact=splitStudentName[0],
                    middleName__iexact=splitStudentName[1],
                    lastName__iexact=splitStudentName[2],
                    identificationDocumentType = idType,
                    identificationDocumentNumber = idNumber,
                    dateOfBirth = dobStudent
                )
                if (userProfile is not None and userProfile.role==role):
                    student = Student.objects.get(userProfile=userProfile)
                    if (student.isParentRegistered == True):
                        return Response({'msg': 'Parents already registered'})
                    else:
                        return Response({'msg': 'Student Verified', 'student': student.id})
                else:
                    return Response({'msg': 'No student found with given details'})
            else:
                userProfile = UserProfile.objects.get(
                    firstName__iexact=splitStudentName[0],
                    lastName__iexact=splitStudentName[1],
                    identificationDocumentType = idType,
                    identificationDocumentNumber = idNumber,
                    dateOfBirth = dobStudent
                )
                if (userProfile is not None and userProfile.role==role):
                    student = Student.objects.get(userProfile=userProfile)
                    if (student.isParentRegistered == True):
                        return Response({'msg': 'Parents already registered'})
                    else:
                        return Response({'msg': 'Student Verified', 'student': student.id})
                else:
                    return Response({'msg': 'No student found with given details'})
        except:
            return Response({'msg': 'No student found with given details'})


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
        studentId = data['id']

        splitParentName = parentName.split(" ")
        student = Student.objects.get(id=studentId)
        if password == confirmPassword:
            if User.objects.filter(username=email).exists():
                return Response({'msg': 'Email is already registered.'}, status=status.HTTP_400_BAD_REQUEST)
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
                    return Response({'msg': 'Signed up successfully.'}, status=status.HTTP_200_OK)
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
                    return Response({'msg': 'Signed up successfully.'}, status=status.HTTP_200_OK)
        else:
            return Response({'msg': 'Passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)


@method_decorator(csrf_protect, name='dispatch')
class LoginView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        username = data['email']
        password = data['password']
        if not User.objects.filter(username=username):
            return Response({'msg': 'No user found with given email!'}, status=status.HTTP_404_NOT_FOUND)
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            loggedInUser = User.objects.get(username=username)
            profile = UserProfile.objects.get(user=loggedInUser)
            return Response({'msg': 'User logged in successfully!', 'username': username, 'role': profile.role.type}, status=status.HTTP_200_OK)
        else:
            return Response({'msg': 'Incorrect password!'}, status=status.HTTP_400_BAD_REQUEST)

    
@method_decorator(csrf_protect, name='dispatch')
class TeacherStudentVerification(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = request.data
        portalId = data['text']
        idType = data['idType']
        idNumber = data['idNumber']
        dob = data['dob']
        try:
            userProfile = UserProfile.objects.get(
                portalId = portalId,
                identificationDocumentType = idType,
                identificationDocumentNumber = idNumber,
                dateOfBirth = dob
            )
            if (userProfile is not None):
                return Response({'msg': 'User verified', 'userRole': userProfile.role.type}, status=status.HTTP_200_OK)
        except:
            return Response({'msg': 'No user found with given details.'}, status=status.HTTP_404_NOT_FOUND)