from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token

from users.views import UserView

urlpatterns = [
    path("register/", UserView.as_view()),
    path("login/", obtain_auth_token),
]
