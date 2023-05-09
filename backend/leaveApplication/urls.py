from django.urls import path
from .views import *

urlpatterns = [
    path('add/', RequestLeave.as_view()),
    path('my/', GetLeaveRequests.as_view()),
]