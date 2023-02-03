from django.urls import path
from .views.auth_views import *


urlpatterns = [
    path('check-auth/', CheckAuthenticated.as_view()),
    path('get-csrf/', GetCSRFToken.as_view()),
    path('verify/', Verification.as_view()),
    path('signup/', SignUp.as_view()),
    path('login/', LoginView.as_view()),
]