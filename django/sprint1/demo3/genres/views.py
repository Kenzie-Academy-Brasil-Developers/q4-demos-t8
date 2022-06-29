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
