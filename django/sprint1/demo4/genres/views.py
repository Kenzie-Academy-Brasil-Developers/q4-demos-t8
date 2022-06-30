from django.http.response import Http404
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView, Request, Response, status

from genres.models import Genre
from genres.serializers import GenreSerializer


class GenreView(APIView):
    def get(self, _: Request):
        genres = Genre.objects.all()
        serialized = GenreSerializer(instance=genres, many=True)

        return Response({"genres": serialized.data}, status.HTTP_200_OK)

    def post(self, request: Request):
        serialized = GenreSerializer(data=request.data)
        serialized.is_valid(raise_exception=True)

        try:
            serialized.save()  # método create do serializer
            return Response(serialized.data, status.HTTP_201_CREATED)

        except ValueError as err:
            return Response(*err.args)


class GenreIdView(APIView):
    def delete(self, _: Request, genre_id: int):
        try:
            genre = get_object_or_404(Genre, pk=genre_id)
            genre.delete()

            serialized = GenreSerializer(genre)

            return Response(serialized.data, status.HTTP_200_OK)

        except Http404:
            return Response({"detail": "Genre not found."}, status.HTTP_404_NOT_FOUND)
