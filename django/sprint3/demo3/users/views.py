from rest_framework import generics

from users.serializers import UserSerializer


class UserView(generics.CreateAPIView):
    serializer_class = UserSerializer
