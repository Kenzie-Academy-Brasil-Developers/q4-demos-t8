from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView, Request, Response, status

from artists.models import Artist
from artists.serializers import ArtistSerializer


class ArtistView(APIView):
    def get(self, _: Request):
        artists = Artist.objects.all()

        serialized = ArtistSerializer(instance=artists, many=True)

        # serialized = [
        #     {"id": artist.id, "name": artist.name, "birth_date": artist.birth_date}
        #     for artist in artists
        # ]

        return Response({"artists": serialized.data}, status.HTTP_200_OK)

    def post(self, request: Request):
        serialized = ArtistSerializer(data=request.data)
        serialized.is_valid(raise_exception=True)

        artist = Artist.objects.create(**serialized.validated_data)

        serialized = ArtistSerializer(instance=artist)

        return Response(serialized.data, status.HTTP_201_CREATED)


class ArtistIdView(APIView):
    def get_artist(self, artist_id: int):
        artist = get_object_or_404(Artist, pk=artist_id)
        serialized = ArtistSerializer(artist)

        return serialized

    def get(self, _: Request, artist_id: int):
        try:
            return Response(self.get_artist(artist_id).data, status.HTTP_200_OK)

        except Http404:
            return Response({"detail": "Artist not found."}, status.HTTP_404_NOT_FOUND)

    def patch(self, request: Request, artist_id: int):
        try:
            artist = get_object_or_404(Artist, pk=artist_id)

            serialized = ArtistSerializer(instance=artist, data=request.data)
            serialized.is_valid(raise_exception=True)
            serialized.save()

            return Response(serialized.data, status.HTTP_200_OK)

        except Http404:
            return Response({"detail": "Artist not found."}, status.HTTP_404_NOT_FOUND)

    def delete(self, _: Request, artist_id: int):
        try:
            artist = get_object_or_404(Artist, pk=artist_id)
            artist.delete()
            serialized = ArtistSerializer(artist)

            return Response(serialized.data, status.HTTP_200_OK)

        except Http404:
            return Response({"detail": "Artist not found."}, status.HTTP_404_NOT_FOUND)
