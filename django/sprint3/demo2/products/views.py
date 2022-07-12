from core.permissions import IsAdminOrReadOnly
from rest_framework import authentication, generics
from stocks.models import Stock

from products.models import Product
from products.serializers import ProductSerializer


class ProductView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    permission_classes = [IsAdminOrReadOnly]
    authentication_classes = [authentication.TokenAuthentication]

    def perform_create(self, serializer: ProductSerializer):
        valid_stock = serializer.validated_data.get("stock")
        stock = Stock.objects.create(**valid_stock)

        serializer.save(stock=stock)
