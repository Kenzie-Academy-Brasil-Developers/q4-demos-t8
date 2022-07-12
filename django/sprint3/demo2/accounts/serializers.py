from django.contrib.auth.hashers import make_password
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
        print("AccountSerializer")
        request: views.Request = self.context["request"]

        if request.user.is_superuser:
            return Account.objects.create_superuser(**validated_data)

        return Account.objects.create_user(**validated_data)


class UpdateAccountSerializer(serializers.ModelSerializer):
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

    def update(self, instance: Account, validated_data: dict):
        user: Account = self.context["request"].user

        is_staff = validated_data.pop("is_staff", False)
        is_superuser = validated_data.pop("is_superuser", False)

        if user.is_superuser:
            validated_data.setdefault("is_staff", is_staff)
            validated_data.setdefault("is_superuser", is_superuser)

        for key, value in validated_data.items():
            if key == "password":
                value = make_password(value)

            setattr(instance, key, value)

        instance.save()

        return instance
