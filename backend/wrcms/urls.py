from django.urls import path
from .views import *

urlpatterns = [
    path('check-auth/', CheckAuthenticated.as_view()),
    path('get-csrf/', GetCSRFToken.as_view()),
    path('parent-verify/', ParentVerification.as_view()),
    path('parent-signup/', ParentSignUp.as_view()),
    path('teacher-student-verify/', TeacherStudentVerification.as_view()),
    path('login/', LoginView.as_view()),
]