from django.urls import path

from musics.views import MusicIdView, MusicView

urlpatterns = [
    path("musics/", MusicView.as_view()),
    path("musics/<int:music_id>/", MusicIdView.as_view()),
]
