from rest_framework import serializers

from artists.models import Artist


class ArtistSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=50)
    birth_date = serializers.DateField(required=False)

    def update(self, instance: Artist, validated_data: dict):
        for key, value in validated_data.items():
            setattr(instance, key, value)
            instance.save()

        return instance
