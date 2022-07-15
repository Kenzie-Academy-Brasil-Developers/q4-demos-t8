from django.urls import path

from addresses.views import AddressView

urlpatterns = [
    path("addresses/", AddressView.as_view()),
]
