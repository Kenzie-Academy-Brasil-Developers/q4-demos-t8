from rest_framework import exceptions, generics

from addresses.models import Address
from addresses.serializers import AddressSerializer


class AddressView(generics.ListCreateAPIView):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer

    def get(self, request, *args, **kwargs):
        state_query = request.GET.get("state", "")

        if len(state_query) > 2:
            raise exceptions.NotAcceptable(
                detail="query state must have 2 digits maximum."
            )

        if state_query:
            self.queryset = Address.objects.filter(state__icontains=state_query).all()
            # __icontais == ilike (sql)
            # __contais == like (sql)
            # __lt == less than
            # __lte == less or equal than
            # __gt == greater than
            # __gte == greater or equal than
            return self.list(request, *args, **kwargs)

        return self.list(request, *args, **kwargs)
