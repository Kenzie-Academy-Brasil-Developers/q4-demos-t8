from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token

from accounts.views import AccountUuidView, AccountView

urlpatterns = [
    path("accounts/", AccountView.as_view()),
    path("accounts/login/", obtain_auth_token),
    path("accounts/<str:user_uuid>/", AccountUuidView.as_view()),
]
