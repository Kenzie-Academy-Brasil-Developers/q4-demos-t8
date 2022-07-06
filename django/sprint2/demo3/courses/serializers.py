from rest_framework import serializers
from users.serializers import UserSerializer

from courses.models import Course


class CourseSerializer(serializers.ModelSerializer):
    instructor = UserSerializer(read_only=True)

    class Meta:
        model = Course
        # fields = "__all__"
        exclude = ["users", "id"]


class CourseInstructorSerializer(serializers.Serializer):
    instructor_id = serializers.IntegerField(write_only=True)
