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
]
