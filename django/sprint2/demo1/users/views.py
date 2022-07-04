from django.contrib.auth.hashers import check_password
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView, Request, Response, status

from users.models import User
from users.serializers import LoginSerializer, UserSerializer


class UserView(APIView):
    def post(self, request: Request):
        serialized = UserSerializer(data=request.data)
        try:
            serialized.is_valid(raise_exception=True)
            serialized.save()

            return Response(serialized.data, status.HTTP_201_CREATED)

        except ValueError as err:
            return Response(*err.args)


class LoginView(APIView):
    def post(self, request: Request):
        serialized = LoginSerializer(data=request.data)
        serialized.is_valid(raise_exception=True)

        user: User = User.objects.filter(
            email=serialized.validated_data["username"]
        ).first()

        if not user:
            return Response(
                {"detail": "Invalid credentials."}, status.HTTP_401_UNAUTHORIZED
            )

        if not check_password(serialized.validated_data["password"], user.password):
            return Response(
                {"detail": "Invalid credentials."}, status.HTTP_401_UNAUTHORIZED
            )

        token, _ = Token.objects.get_or_create(user=user)

        return Response({"stts": "ok"})
