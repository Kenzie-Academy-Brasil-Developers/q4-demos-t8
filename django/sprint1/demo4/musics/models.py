from django.db import models


class Music(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(null=True)

    artist = models.ForeignKey(
        to="artists.Artist", on_delete=models.CASCADE, related_name="musics"
    )
    genres = models.ManyToManyField(to='genres.Genre')
