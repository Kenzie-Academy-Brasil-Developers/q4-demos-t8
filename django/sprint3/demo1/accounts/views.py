from rest_framework import authentication, generics, permissions

from accounts.models import Account
from accounts.permissions import IsAdmin
from accounts.serializers import AccountSerializer


class AccountView(generics.ListCreateAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    authentication_classes = [authentication.TokenAuthentication]


class AccountUuidView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated, IsAdmin]

    lookup_field = "user_uuid"
