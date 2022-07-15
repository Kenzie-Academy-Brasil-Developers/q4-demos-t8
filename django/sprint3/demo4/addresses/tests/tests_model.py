from addresses.models import Address
from django.contrib.auth.models import AbstractUser
from django.test import TestCase
from users.models import User


class AddressModelTest(TestCase):
    @classmethod
    def setUpTestData(cls) -> None:
        cls.address_data = {
            "state": "sp",
            "street": "r. das flores",
            "number": 3,
            "zip_code": "4658-651",
        }

        cls.user_obj = User.objects.create_user(username="user", password="1234")

        cls.address_obj: Address = Address.objects.create(**cls.address_data)
        cls.address_obj.users.add(cls.user_obj)
        cls.address_obj.save()

    def test_address_fields(self):
        self.assertIsInstance(self.address_obj.state, str)
        self.assertEqual(self.address_obj.state, self.address_data["state"])

        self.assertIsInstance(self.address_obj.street, str)
        self.assertEqual(self.address_obj.street, self.address_data["street"])

        self.assertIsInstance(self.address_obj.number, int)
        self.assertEqual(self.address_obj.number, self.address_data["number"])

        self.assertIsInstance(self.address_obj.zip_code, str)
        self.assertEqual(self.address_obj.zip_code, self.address_data["zip_code"])

        self.assertEqual(self.address_obj.users.first(), self.user_obj)
        self.assertIsInstance(self.address_obj.users.first(), AbstractUser)
