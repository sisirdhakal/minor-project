from django.urls import path
from .views import *

urlpatterns = [
    path('class/', ClassList.as_view()),
    path('class/add/', ClassAdd.as_view()),
    path('class/<str:id>/edit/', ClassEdit.as_view()),
    path('class/<str:id>/delete/', ClassDelete.as_view()),
]
