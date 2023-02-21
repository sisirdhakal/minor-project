from django.urls import path
from .views.auth_views import *
from .views.attendance_views import *


urlpatterns = [
    path('check-auth/', CheckAuthenticated.as_view()),
    path('get-csrf/', GetCSRFToken.as_view()),
    path('verify/', Verification.as_view()),
    path('signup/', SignUp.as_view()),
    path('login/', LoginView.as_view()),
    path('logout/', LogoutView.as_view()),

    path('get-lectures/', GetLectures.as_view()),
    path('get-practical-classes/', GetPracticalClass.as_view()),
    # path('get-students-for-attendance/<str:id>/', LectureDetailForAttendance.as_view()),
    path('add-attendance/<str:id>/', AddAttendance.as_view()),
    path('view-lecture-attendance/<str:id>/', ViewLectureAttendance.as_view()),
    path('edit-attendance/<str:idDate>/', EditLectureAttendance.as_view()),
]