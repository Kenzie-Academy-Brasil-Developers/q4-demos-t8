from uuid import uuid4

from django.db import models


class Product(models.Model):
    product_uuid = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    name = models.CharField(max_length=100)
    price = models.FloatField()
    discount = models.FloatField(default=0)

    stock = models.OneToOneField(
        "stocks.Stock", on_delete=models.CASCADE, related_name="product"
    )

    carts = models.ManyToManyField(
        "accounts.Account", related_name="products", through="products.Cart"
    )


class Cart(models.Model):
    cart_uuid = models.UUIDField(primary_key=True, default=uuid4, editable=False)

    total = models.FloatField()
    quantity = models.IntegerField()
    paid = models.BooleanField(default=False)

    account = models.ForeignKey(
        "accounts.Account", on_delete=models.CASCADE, related_name="carts"
    )
    product = models.ForeignKey("products.Product", on_delete=models.CASCADE)
