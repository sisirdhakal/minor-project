from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from wrcms.models import UserProfile, Teacher, Student, Class, Department, Lecture, Notice
from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator
from rest_framework import status
from django.db.models import Q
from django.db import transaction
from ..serializers.notice_serializers import ClassSerializer, DepartmentSerializer, NoticeSerializer, NoticeFullDetailsSerializer


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
        data = self.request.data
        noticeType = data['noticeType']
        noticeFor = data['noticeFor']
        noticeTitle = data['title']
        content = data['content']
        file = request.FILES.get('noticeFile')
        if Class.objects.filter(name=noticeFor).exists or Department.objects.filter(name=noticeFor).exists:
            try:
                Notice.objects.create(noticeFor=noticeFor, title=noticeTitle, uploaded_by=user, noticeType=noticeType, content=content, file=file)
                return Response({'msg': 'Notice added successfully!'}, status=status.HTTP_200_OK)
            except:
                return Response({'msg': 'Could not add notice. Check details and try again.'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'msg': 'Class or Department not found.'}, status=status.HTTP_404_NOT_FOUND)



@method_decorator(csrf_protect, name='dispatch')
class ViewNotice(APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def get(self, request, format=None):
        user = request.user
        try:
            userProfile = UserProfile.objects.get(user=user)
            if userProfile.role.type == "Student":
                student = Student.objects.get(user=user, userProfile=userProfile)
                collegeNotices = Notice.objects.filter(noticeType="College").order_by("-postedOn")
                departmentNotices = Notice.objects.filter(noticeType="Department", noticeFor=student.department.name).order_by("-postedOn")
                classNotices = Notice.objects.filter(noticeType="Class", noticeFor=student.cLass.name).order_by("-postedOn")
                collegeNoticeSerializer = NoticeSerializer(collegeNotices, many=True)
                departmentNoticeSerializer = NoticeSerializer(departmentNotices, many=True)
                classNoticeSerializer = NoticeSerializer(classNotices, many=True)
                content = {
                    'collegeNotices': collegeNoticeSerializer.data,
                    'departmentNotices': departmentNoticeSerializer.data,
                    'classNotices': classNoticeSerializer.data
                }
                return Response(content, status=status.HTTP_200_OK)
            if userProfile.role.type == "Teacher":
                teacher = Teacher.objects.get(user=user, userProfile=userProfile)
                collegeNotices = Notice.objects.filter(noticeType="College").order_by("-postedOn")
                departmentNotices = Notice.objects.filter(noticeType="Department", noticeFor=teacher.department.name).order_by("-postedOn")
                classNotices = Notice.objects.filter(noticeType="Class", uploaded_by=user).order_by("-postedOn")
                collegeNoticeSerializer = NoticeSerializer(collegeNotices, many=True)
                departmentNoticeSerializer = NoticeSerializer(departmentNotices, many=True)
                classNoticeSerializer = NoticeSerializer(classNotices, many=True)
                content = {
                    'collegeNotices': collegeNoticeSerializer.data,
                    'departmentNotices': departmentNoticeSerializer.data,
                    'classNotices': classNoticeSerializer.data
                }
                return Response(content, status=status.HTTP_200_OK)
        except:
            return Response({'msg': 'Error while fetching data.'}, status=status.HTTP_404_NOT_FOUND)
        

@method_decorator(csrf_protect, name='dispatch')
class EditNotice(APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def get(self, request, id, format=None):
        user = request.user
        try:
            notice = Notice.objects.get(id=id)
            if notice.uploaded_by == user:
                noticeSerializer = NoticeFullDetailsSerializer(notice, many=False)
                return Response(noticeSerializer.data)
            else:
                return Response({'msg': 'Not authorized to edit this notice.'}, status=status.HTTP_401_UNAUTHORIZED)
        except:
            return Response({'msg': 'Notice not found.'}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, id, format=None):
        user = request.user
        data = self.request.data
        try:
            notice = Notice.objects.get(id=id)
            if notice.uploaded_by == user:
                serializer = NoticeFullDetailsSerializer(notice, data=data, partial=True)
                # notice.noticeType = data['noticeType']
                # notice.noticeFor = data['noticeFor']
                # notice.title = data['title']
                # notice.content = data['content']
                # notice.file = request.FILES.get('noticeFile')
                # notice.save()
                if serializer.is_valid():
                    serializer.save()
                    return Response({'msg': 'Notice edited successfully!'}, status=status.HTTP_200_OK)
                return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'msg': 'Not authorized to edit this notice.'}, status=status.HTTP_401_UNAUTHORIZED)
        except:
            return Response({'msg': 'Notice not found.'}, status=status.HTTP_404_NOT_FOUND)
        

@method_decorator(csrf_protect, name='dispatch')
class DeleteNotice(APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def delete(self, request, id, format=None):
        user = request.user
        try:
            notice = Notice.objects.get(id=id)
            if notice.uploaded_by == user:
                notice.delete()
                return Response({'msg': 'The notice is deleted!'}, status=status.HTTP_200_OK)
            else:
                return Response({'msg': 'Not authorized to edit this notice.'}, status=status.HTTP_401_UNAUTHORIZED)
        except:
            return Response({'msg': 'Notice not found.'}, status=status.HTTP_404_NOT_FOUND)


@method_decorator(csrf_protect, name='dispatch')
class GetNoticeDetails(APIView):
    permission_classes = (permissions.IsAuthenticated, )
    
    def get(self, request, id, format=None):
        user = request.user
        try:
            userProfile = UserProfile.objects.get(user=user)
            notice = Notice.objects.get(id=id)
            if userProfile.role.type == "Student":
                student = Student.objects.get(user=user, userProfile=userProfile)
                if notice.noticeType == 'College' or notice.noticeFor == student.cLass.name or notice.noticeFor == student.department.name:
                    serializer = NoticeSerializer(notice, many=False)
                    return Response(serializer.data, status=status.HTTP_200_OK)
                else:
                    return Response({'msg': 'Not allowed to view this notice.'}, status=status.HTTP_401_UNAUTHORIZED)
            elif userProfile.role.type == "Teacher":
                teacher = Teacher.objects.get(user=user, userProfile=userProfile)
                if notice.noticeType == 'College' or notice.noticeFor == teacher.department.name or notice.uploaded_by == user:
                    serializer = NoticeSerializer(notice, many=False)
                    return Response(serializer.data, status=status.HTTP_200_OK)
                else:
                    return Response({'msg': 'Not allowed to view this notice.'}, status=status.HTTP_401_UNAUTHORIZED)
            else:
                serializer = NoticeSerializer(notice, many=False)
                return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response({'msg': 'Notice not found.'}, status=status.HTTP_404_NOT_FOUND)