from django.urls import path
from .views import GetCSRFToken, ParentVerification

urlpatterns = [
    path('get-csrf/', GetCSRFToken.as_view()),
    path('parent-verify/', ParentVerification.as_view()),
]