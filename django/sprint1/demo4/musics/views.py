from django.http import Http404
from django.shortcuts import get_object_or_404
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


class MusicIdView(APIView):
    def get(self, _: Request, music_id: int):
        try:
            music = get_object_or_404(Music, pk=music_id)
            serialized = MusicSerializer(music)

            return Response(serialized.data, status.HTTP_200_OK)

        except Http404:
            return Response({"detail": "Music not found."}, status.HTTP_404_NOT_FOUND)

    def patch(self, request: Request, music_id: int):
        try:
            music = get_object_or_404(Music, pk=music_id)

            serialized = MusicSerializer(music, request.data, partial=True)
            serialized.is_valid(raise_exception=True)
            serialized.save()

            return Response(serialized.data, status.HTTP_200_OK)

        except Http404:
            return Response({"detail": "Music not found."}, status.HTTP_404_NOT_FOUND)

        except KeyError as err:
            return Response(*err.args)
