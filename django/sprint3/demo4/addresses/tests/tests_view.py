from addresses.models import Address
from rest_framework.test import APITestCase


class AddressViewTest(APITestCase):
    @classmethod
    def setUpTestData(cls) -> None:
        cls.url = "/api/addresses/"

        cls.address_data = {
            "state": "SP",
            "street": "R. das Flores",
            "number": 3,
            "zip_code": "0448-080",
        }

        cls.address_data_response = {
            "id": 1,
            "state": "SP",
            "number": 3,
            "street": "R. das Flores",
            "zip_code": "0448-080",
            "users": [],
        }

    def test_create_address(self) -> None:
        response = self.client.post(self.url, self.address_data)

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json(), self.address_data_response)

    def test_create_address_fail_missing_fields(self):
        response = self.client.post(self.url, {})

        self.assertEqual(response.status_code, 400)
        self.assertDictEqual(
            response.json(),
            {
                "state": ["This field is required."],
                "street": ["This field is required."],
                "zip_code": ["This field is required."],
            },
        )

    def test_create_address_fail_state_more_then_2_characteres(self):
        self.address_data["state"] = "1234"
        response = self.client.post(self.url, self.address_data)

        self.assertEqual(response.status_code, 400)
        self.assertDictEqual(
            response.json(),
            {"state": ["Ensure this field has no more than 2 characters."]},
        )

    def test_get_addressess(self):
        for _ in range(10):
            Address.objects.create(**self.address_data)

        response = self.client.get(self.url)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 10)

    def test_get_addressess_per_state(self):
        for _ in range(10):
            Address.objects.create(**self.address_data)

        self.address_data["state"] = "RJ"

        for _ in range(5):
            Address.objects.create(**self.address_data)

        response_query_sp = self.client.get(f"{self.url}?state=sp")
        response_query_rj = self.client.get(f"{self.url}?state=rj")

        self.assertEqual(response_query_sp.status_code, 200)
        self.assertEqual(len(response_query_sp.json()), 10)

        self.assertEqual(response_query_rj.status_code, 200)
        self.assertEqual(len(response_query_rj.json()), 5)

    def test_get_addressess_invalid_state_query(self):
        response = self.client.get(f"{self.url}?state=1124/")

        self.assertEqual(response.status_code, 406)
        self.assertDictEqual(
            response.json(), {"detail": "query state must have 2 digits maximum."}
        )
