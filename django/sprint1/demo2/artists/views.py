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
