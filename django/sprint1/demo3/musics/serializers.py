from artists.models import Artist
from artists.serializers import ArtistSerializer
from django.shortcuts import get_object_or_404
from genres.models import Genre
from genres.serializers import GenreSerializer
from rest_framework import serializers

from musics.models import Music


class MusicSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)

    name = serializers.CharField(max_length=255)
    description = serializers.CharField(required=False)

    artist_id = serializers.IntegerField(write_only=True)

    author = ArtistSerializer(read_only=True, source='artist')
    genres = GenreSerializer(many=True)

    def create(self, validated_data):
        artist_id = validated_data.pop("artist_id")
        genres = validated_data.pop("genres")

        artist = get_object_or_404(Artist, pk=artist_id)

        music = Music.objects.create(**validated_data, artist=artist)

        for genre in genres:
            genre, _ = Genre.objects.get_or_create(**genre)
            music.genres.add(genre)

        return music
