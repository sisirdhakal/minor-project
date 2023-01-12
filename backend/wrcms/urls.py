from django.urls import path
from .views import GetCSRFToken

urlpatterns = [
    path('get-csrf/', GetCSRFToken.as_view()),
]