from django.urls import path
from .views import *

urlpatterns = [
    # path('add/', RequestLeave.as_view()),
    # path('my/', GetLeaveRequests.as_view()),
    # path('approve/<str:id>/', ApproveLeaveRequest.as_view()),
    # path('delete/<str:id>/', DeleteLeaveRequest.as_view()),
    # path('edit/<str:id>/', EditLeaveRequest.as_view()),
    path('add/<str:id>/', AddInternalMarks.as_view()),
    path('view/student/<str:sem>/', StudentViewInternalMarks.as_view()),
    path('view/admin/<str:idsem>/', AdminViewInternalMarks.as_view()),
    path('view/<str:id>/', ViewInternalMarks.as_view()),
]