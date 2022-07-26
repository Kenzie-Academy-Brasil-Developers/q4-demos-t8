from rest_framework import serializers

from users.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'is_staff', 'is_superuser', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

        read_only_fields = ['is_staff', 'is_superuser']

    def create(self, validated_data: dict):
        return User.objects.create_user(**validated_data)
