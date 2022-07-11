from rest_framework import serializers, views

from accounts.models import Account


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = (
            "user_uuid",
            "username",
            "password",
            "is_staff",
            "is_superuser",
        )

        extra_kwargs = {"password": {"write_only": True}}

        read_only_fields = (
            "is_staff",
            "is_superuser",
        )

    def create(self, validated_data: dict):
        request: views.Request = self.context["request"]

        if request.user.is_superuser:
            return Account.objects.create_superuser(**validated_data)

        return Account.objects.create_user(**validated_data)
