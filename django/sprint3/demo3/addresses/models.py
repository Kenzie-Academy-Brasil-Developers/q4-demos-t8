from django.db import models


class Address(models.Model):
    state = models.CharField(max_length=2)
    street = models.CharField(max_length=100)
    number = models.IntegerField(null=True)
    zip_code = models.CharField(max_length=20)

    users = models.ManyToManyField("users.User", related_name="addresses")
