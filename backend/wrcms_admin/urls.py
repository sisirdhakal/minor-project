from django.urls import path
from .views import *

urlpatterns = [
    path('class/', ClassList.as_view()),
    path('class/add/', ClassAdd.as_view()),
    path('class/<str:id>/edit/', ClassEdit.as_view()),
    path('class/<str:id>/delete/', ClassDelete.as_view()),

    path('batch/', BatchList.as_view()),
    path('batch/add/', BatchAdd.as_view()),
    path('batch/<str:id>/edit/', BatchEdit.as_view()),
    path('batch/<str:id>/delete/', BatchDelete.as_view()),

    path('department/', DepartmentList.as_view()),
    path('department/add/', DepartmentAdd.as_view()),
    path('department/<str:id>/edit/', DepartmentEdit.as_view()),
    path('department/<str:id>/delete/', DepartmentDelete.as_view()),

    path('program/', ProgramList.as_view()),
    path('program/add/', ProgramAdd.as_view()),
    path('program/<str:id>/edit/', ProgramEdit.as_view()),
    path('program/<str:id>/delete/', ProgramDelete.as_view()),

    path('lecture/', LectureList.as_view()),
    path('lecture/add/', LectureAdd.as_view()),
    path('lecture/<str:id>/edit/', LectureEdit.as_view()),
    path('lecture/<str:id>/delete/', LectureDelete.as_view()),

    path('student/', StudentList.as_view()),
    path('student/add/', StudentAdd.as_view()),
    path('student/<str:id>/', StudentDetail.as_view()),
    path('student/<str:id>/edit/', StudentEdit.as_view()),
    path('student/<str:id>/delete/', StudentDelete.as_view()),

    path('teacher/', TeacherList.as_view()),
    path('teacher/add/', TeacherAdd.as_view()),
    path('teacher/<str:id>/', TeacherDetail.as_view()),
    path('teacher/<str:id>/edit/', TeacherEdit.as_view()),
    path('teacher/<str:id>/delete/', TeacherDelete.as_view()),

    path('parent/', ParentList.as_view()),
    path('parent/<str:id>/', ParentDetail.as_view()),

    path('routine/', RoutineList.as_view()),
    path('routine/add/', RoutineAdd.as_view()),
    path('routine/<str:id>/edit/', RoutineEdit.as_view()),
    path('routine/<str:id>/delete/', RoutineDelete.as_view()),

    path('syllabus/', SyllabusList.as_view()),
    
]
