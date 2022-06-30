from django.urls import path

from genres.views import GenreIdView, GenreView

urlpatterns = [
    path("genres/", GenreView.as_view()),
    path("genres/<int:genre_id>/", GenreIdView.as_view()),
]
