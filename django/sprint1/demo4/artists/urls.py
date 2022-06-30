from django.urls import path

from artists.views import ArtistIdView, ArtistView

urlpatterns = [
    path("artists/", ArtistView.as_view()),
    path("artists/<int:artist_id>/", ArtistIdView.as_view()),
]
