from core.pagination import CustomPageNumberPagination
from django.contrib.auth import authenticate
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.pagination import PageNumberPagination
from rest_framework.views import APIView, Request, Response, status

from users.models import User
from users.permissions import UserPermission
from users.serializers import LoginSerializer, UserSerializer


class UserView(APIView, PageNumberPagination):
    authentication_classes = [TokenAuthentication]
    permission_classes = [UserPermission]

    def get(self, request: Request):
        users = User.objects.all()
        pagination = self.paginate_queryset(queryset=users, request=request, view=self)
        serialized = UserSerializer(pagination, many=True)

        return self.get_paginated_response(serialized.data)

    def post(self, request: Request):
        serialized = UserSerializer(data=request.data)

        serialized.is_valid(raise_exception=True)
        serialized.save()

        return Response(serialized.data, status.HTTP_201_CREATED)


class LoginView(APIView):
    def post(self, request: Request):
        serialized = LoginSerializer(data=request.data)
        serialized.is_valid(raise_exception=True)

        user: User = authenticate(**serialized.validated_data)

        if not user:
            return Response(
                {"detail": "Invalid credentials."}, status.HTTP_401_UNAUTHORIZED
            )

        token, _ = Token.objects.get_or_create(user=user)

        return Response({"token": token.key}, status.HTTP_200_OK)
