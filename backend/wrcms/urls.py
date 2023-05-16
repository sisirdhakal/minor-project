from django.urls import path
from .views.auth_views import *
from .views.attendance_views import *
from .views.notice_views import *
from .views.teacher_advice_views import *


urlpatterns = [
    # authentication
    path('check-auth/', CheckAuthenticated.as_view()),
    path('get-csrf/', GetCSRFToken.as_view()),
    path('verify/', Verification.as_view()),
    path('signup/', SignUp.as_view()),
    path('login/', LoginView.as_view()),
    path('logout/', LogoutView.as_view()),

    # attendance
    path('get-lectures/', GetLectures.as_view()),
    path('get-practical-classes/', GetPracticalClass.as_view()),
    path('add-attendance/<str:id>/', AddAttendance.as_view()),
    path('view-lecture-attendance/<str:id>/', ViewLectureAttendance.as_view()),
    path('edit-attendance/<str:idDate>/', EditLectureAttendance.as_view()),
    path('view-student-attendance/<str:sem>/', ViewStudentAttendance.as_view()),

    # notices
    path('add-notice/', AddNotice.as_view()),
    path('view-notice/', ViewNotice.as_view()),
    path('get-notice-detail/<str:id>/', GetNoticeDetails.as_view()),
    path('edit-notice/<str:id>/', EditNotice.as_view()),
    path('delete-notice/<str:id>/', DeleteNotice.as_view()),

    # teacher advice
    path('get-advice/', AdviceList.as_view()),
    path('add-advice/', AdviceAdd.as_view()),
    path('edit-advice/<str:id>/', AdviceEdit.as_view()),
    path('delete-advice/<str:id>/', AdviceDelete.as_view()),
]