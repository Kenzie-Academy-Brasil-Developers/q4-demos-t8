from django.urls import path

from artists.views import ArtistView

urlpatterns = [
    path("artists/", ArtistView.as_view()),
]
