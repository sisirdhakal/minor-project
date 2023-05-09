from django.urls import path
from .views import *

urlpatterns = [
    path('add/', RequestLeave.as_view()),
]