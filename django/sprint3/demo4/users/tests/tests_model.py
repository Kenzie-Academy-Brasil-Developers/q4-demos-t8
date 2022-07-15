from django.contrib.auth.hashers import check_password
from django.contrib.auth.models import AbstractUser
from django.test import TestCase
from users.models import User


class UserModelTest(TestCase):
    @classmethod
    def setUpTestData(cls) -> None:
        cls.username = "user"
        cls.password = "1234"
        cls.user_obj: User = User.objects.create_user(
            username=cls.username, password=cls.password
        )

    def test_user_fields(self):
        self.assertIsInstance(self.user_obj.username, str)
        self.assertEqual(self.user_obj.username, self.username)

        self.assertIsInstance(self.user_obj.password, str)
        self.assertTrue(check_password(self.password, self.user_obj.password))

        self.assertIsInstance(self.user_obj, AbstractUser)
