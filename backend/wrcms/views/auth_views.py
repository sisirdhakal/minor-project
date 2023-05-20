from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from django.contrib.auth.models import User
from wrcms.models import UserProfile, Student, UserRole, Parent, Teacher
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator
from django.contrib.auth import authenticate, login, logout
from rest_framework import status
from ..email import send_welcome_message


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
class Verification(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = request.data
        nameOrID = data['text']
        idType = data['idType']
        idNumber = data['idNumber']
        dobStudent = data['dobStudent']
        role = data['role']
        if role=='two':
            try:
                splitStudentName = nameOrID.split(" ")
                role = UserRole.objects.get(type='Student')
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
                            return Response({'msg': 'Parents already registered'}, status=status.HTTP_409_CONFLICT)
                        else:
                            return Response({'msg': 'Student Verified', 'id': student.id}, status=status.HTTP_200_OK)
                    else:
                        return Response({'msg': 'No student found with given details'}, status=status.HTTP_404_NOT_FOUND)
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
                            return Response({'msg': 'Parents already registered'}, status=status.HTTP_409_CONFLICT)
                        else:
                            return Response({'msg': 'Student Verified', 'id': student.id}, status=status.HTTP_200_OK)
                    else:
                        return Response({'msg': 'No student found with given details'}, status=status.HTTP_404_NOT_FOUND)
            except:
                return Response({'msg': 'No student found with given details'}, status=status.HTTP_404_NOT_FOUND)
        elif role=='one':
            try:
                userProfile = UserProfile.objects.get(
                    portalId = nameOrID,
                    identificationDocumentType = idType,
                    identificationDocumentNumber = idNumber,
                    dateOfBirth = dobStudent
                )
                if (userProfile is not None):
                    return Response({'msg': 'User verified', 'userRole': userProfile.role.type, 'id':nameOrID, 'email':userProfile.email}, status=status.HTTP_200_OK)
            except:
                return Response({'msg': 'No user found with given details.'}, status=status.HTTP_404_NOT_FOUND)
        


@method_decorator(csrf_protect, name='dispatch')
class SignUp(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = request.data
        role = data['role']
        password = data['password']
        if role=='two':
            courtesyTitle = data['courtesyTitle']
            parentName = data['parentName']
            address = data['address']
            contactNumber = data['contactNumber']
            email = data['email']
            studentId = data['id']
            if User.objects.filter(username=email).exists():
                return Response({'msg': 'Email is already registered.'}, status=status.HTTP_409_CONFLICT)
            else:
                student = Student.objects.get(id=studentId)
                splitParentName = parentName.split(" ")
                try:
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
                            email = email,
                            role = UserRole.objects.get(type='Parent'),
                            identificationDocumentType = 'Citizenship',
                            dateOfBirth = 'YYYY/MM/DD'
                        )
                        Parent.objects.create(
                            user = user,
                            userProfile = userProfile,
                            parentOf = student
                        )
                        send_welcome_message(userProfile)
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
                        send_welcome_message(userProfile)
                        return Response({'msg': 'Signed up successfully.'}, status=status.HTTP_200_OK)
                except:
                    return Response({'msg': 'Error while signing up!'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        elif role=='one':
            userType = data['userRole']
            portalID = data['id']
            if userType=='Teacher':
                try:
                    role = UserRole.objects.get(type='Teacher')
                    teacherUserProfile = UserProfile.objects.get(portalID=portalID, role=role)
                    if User.objects.filter(username=teacherUserProfile.email).exists():
                        return Response({'msg': 'Email is already registered.'}, status=status.HTTP_409_CONFLICT)
                    else:
                        user = User.objects.create_user(username=teacherUserProfile.email, email=teacherUserProfile.email, password=password)
                        user.save()
                        teacherUserProfile.user = user
                        teacher = Teacher.objects.get(userProfile=teacherUserProfile)
                        teacher.user = user
                        teacherUserProfile.save()
                        teacher.save()
                        send_welcome_message(teacherUserProfile)
                        return Response({'msg': 'Signed up successfully.'}, status=status.HTTP_200_OK)
                except:
                    return Response({'msg': 'Error while signing up!'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            elif userType=='Student':
                try:
                    role = UserRole.objects.get(type='Student')
                    studentUserProfile = UserProfile.objects.get(portalId=portalID, role=role)
                    if User.objects.filter(username=studentUserProfile.email).exists():
                        return Response({'msg': 'Email is already registered.'}, status=status.HTTP_409_CONFLICT)
                    else:
                        user = User.objects.create_user(username=studentUserProfile.email, email=studentUserProfile.email, password=password)
                        user.save()
                        studentUserProfile.user = user
                        student = Student.objects.get(userProfile=studentUserProfile)
                        student.user = user
                        studentUserProfile.save()
                        student.save()
                        send_welcome_message(studentUserProfile)
                        return Response({'msg': 'Signed up successfully.'}, status=status.HTTP_200_OK)
                except:
                    return Response({'msg': 'Error while signing up!'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@method_decorator(csrf_protect, name='dispatch')
class LoginView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data
        response = Response()
        username = data['email']
        password = data['password']
        if not User.objects.filter(username=username):
            return Response({'msg': 'No user found with given email!'}, status=status.HTTP_404_NOT_FOUND)
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            loggedInUser = User.objects.get(username=username)
            profile = UserProfile.objects.get(user=loggedInUser)
            response.set_cookie('role', profile.role.type)
            if (profile.role.type == 'Student'):
                responseData = {'msg': 'User logged in successfully!', 'username': username, 'role':profile.role.type, 'name':profile.getFullName(), 'semester':profile.student.cLass.semester}
            elif (profile.role.type == 'Parent'):
                responseData = {'msg': 'User logged in successfully!', 'username': username, 'role':profile.role.type, 'name':profile.getFullName(), 'semester':profile.parent.parentOf.cLass.semester}
            else:
                responseData = {'msg': 'User logged in successfully!', 'username': username, 'role':profile.role.type, 'name':profile.getFullName()}
            response.data = responseData
            return response
        else:
            return Response({'msg': 'Incorrect password!'}, status=status.HTTP_400_BAD_REQUEST)


@method_decorator(csrf_protect, name='dispatch')
class LogoutView(APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def get(self, request, format=None):
        response = Response()
        logout(request)
        response.delete_cookie('role')
        response.data = {'msg': 'You are logged out from WRCMS!'}
        return response