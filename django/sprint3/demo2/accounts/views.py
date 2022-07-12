from core.mixins import SerializerByMethodMixin
from rest_framework import authentication, generics, permissions

from accounts.models import Account
from accounts.permissions import IsAdmin
from accounts.serializers import AccountSerializer, UpdateAccountSerializer


class AccountView(generics.ListCreateAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    authentication_classes = [authentication.TokenAuthentication]


class AccountUuidView(SerializerByMethodMixin, generics.RetrieveUpdateDestroyAPIView):
    queryset = Account.objects.all()
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated, IsAdmin]

    lookup_field = "user_uuid"

    serializer_map = {
        "GET": AccountSerializer,
        "PUT": UpdateAccountSerializer,
        "PATCH": UpdateAccountSerializer,
        "DELETE": AccountSerializer,
    }
