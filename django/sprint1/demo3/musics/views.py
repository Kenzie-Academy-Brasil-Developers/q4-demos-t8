from rest_framework.views import APIView, Request, Response, status

from musics.models import Music
from musics.serializers import MusicSerializer


class MusicView(APIView):
    def get(self, _: Request):
        artists = Music.objects.all()
        serialized = MusicSerializer(instance=artists, many=True)

        return Response({"musics": serialized.data}, status.HTTP_200_OK)

    def post(self, request: Request):
        serialized = MusicSerializer(data=request.data)
        serialized.is_valid(raise_exception=True)
        serialized.save()

        return Response(serialized.data, status.HTTP_201_CREATED)
