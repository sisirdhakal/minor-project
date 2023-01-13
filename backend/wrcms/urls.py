from django.urls import path
from .views import *

urlpatterns = [
    path('get-csrf/', GetCSRFToken.as_view()),
    path('parent-verify/', ParentVerification.as_view()),
    path('parent-signup/', ParentSignUp.as_view()),
]