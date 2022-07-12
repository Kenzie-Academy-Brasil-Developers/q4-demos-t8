from rest_framework import serializers
from stocks.serializers import StockSerializer

from products.models import Product


class ProductSerializer(serializers.ModelSerializer):
    stock = StockSerializer()

    class Meta:
        model = Product

        fields = (
            "product_uuid",
            "name",
            "price",
            "discount",
            "stock",
        )
