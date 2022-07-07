from django.shortcuts import get_object_or_404
from rest_framework import serializers
from rest_framework.exceptions import NotAcceptable, PermissionDenied
from users.models import User
from users.serializers import UserSerializer

from courses.models import Course


class StudentSerializer(serializers.Serializer):
    student_id = serializers.IntegerField(read_only=True, source="id")
    email = serializers.EmailField(read_only=True)
    first_name = serializers.CharField(read_only=True)


class CourseSerializer(serializers.ModelSerializer):
    instructor = UserSerializer(read_only=True)
    users = StudentSerializer(read_only=True, many=True)

    class Meta:
        model = Course
        fields = [
            "id",
            "name",
            "type",
            "instructor",
            "users",
        ]
        # exclude = ["users"]

    def validate_name(self, name: str):
        return name.title()


class CourseInstructorSerializer(serializers.Serializer):
    instructor_id = serializers.IntegerField(write_only=True)

    def update(self, instance: Course, validated_data: dict):
        instructor_id = validated_data.get("instructor_id")
        user = get_object_or_404(User, pk=instructor_id)

        if not user.is_staff:
            raise PermissionDenied(detail=f"Instructor must be `is_staff=True`.")

        instance.instructor = user
        instance.save()

        return instance


class CourseStudentsSerializer(serializers.Serializer):
    students_id = serializers.ListField(
        child=serializers.IntegerField(), allow_empty=False
    )

    def students_list(self, students_id: list[int]):
        return [get_object_or_404(User, pk=student_id) for student_id in students_id]

    def update(self, instance: Course, validated_data: dict):
        students_id = validated_data.get("students_id")
        students: list[User] = self.students_list(students_id)

        for student in students:
            if student.is_staff:
                raise NotAcceptable(
                    detail=f"Staff member (`{student.id=}`) can't be a student."
                )

        instance.users.set(students)

        return instance
