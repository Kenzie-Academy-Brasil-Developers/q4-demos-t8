from faker import Faker
from rest_framework.test import APITestCase
from users.models import User


class UserViewTest(APITestCase):
    @classmethod
    def setUpTestData(cls) -> None:
        fake = Faker()
        cls.url = "/api/register/"
        cls.user_data = {"username": fake.first_name(), "password": "1234"}
        cls.invalid_user_data = {
            "username": fake.first_name(),
        }

    def test_create_user(self) -> None:
        response = self.client.post(self.url, self.user_data)

        self.assertEqual(response.status_code, 201)
        self.assertNotIn("password", response.json())

    def test_create_user_fails(self) -> None:
        response = self.client.post(self.url, self.invalid_user_data)

        self.assertEqual(response.status_code, 400)
        self.assertIn("password", response.json())


class LoginViewTest(APITestCase):
    @classmethod
    def setUpTestData(cls) -> None:
        fake = Faker()
        cls.url = "/api/login/"
        cls.user_data = {"username": fake.first_name(), "password": "1234"}
        cls.invalid_user_data = {"username": fake.first_name(), "password": "123456789"}

    def setUp(self) -> None:
        User.objects.create_user(**self.user_data)

    def test_login(self):
        response = self.client.post(self.url, self.user_data)

        self.assertEqual(response.status_code, 200)
        self.assertIn("token", response.json())

    def test_login_fail_invalid_credentials(self):
        response = self.client.post(self.url, self.invalid_user_data)

        self.assertEqual(response.status_code, 400)
        self.assertDictEqual(
            response.json(),
            {"non_field_errors": ["Unable to log in with provided credentials."]},
        )

    def test_login_fail_invalid_body(self):
        response = self.client.post(self.url, {"username": "username"})

        self.assertEqual(response.status_code, 400)
        self.assertIn("password", response.json())
