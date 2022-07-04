from django.contrib.auth.models import AbstractUser
from django.db import models

from users.managers import UserManager


class User(AbstractUser):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=60)
    last_name = models.CharField(max_length=60)
    password = models.CharField(max_length=128)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    username = None

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]


# class User(models.Model):
#     email = models.EmailField(unique=True)
#     first_name = models.CharField(max_length=60)
#     last_name = models.CharField(max_length=60)
#     password = models.CharField(max_length=128)

#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)
#     """diferença entre auto_now_add e auto_add

#     auto_now_add: faz a criação da data automaticamente, porém
#         o campo só é atualizado na hora da criação, depois ele
#         não é mais alterado.

#     auto_now: faz a criação da data autoamticamente, porém o
#         campo é atualizado toda vez que o dado for atualizado.
#     """
