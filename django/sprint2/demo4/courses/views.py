from django.shortcuts import get_object_or_404
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.views import APIView, Request, Response, status
from users.models import User

from courses.models import Course
from courses.permissions import CoursePermission
from courses.serializers import (CourseInstructorSerializer, CourseSerializer,
                                 CourseStudentsSerializer)


class CourseView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [CoursePermission]

    def get(self, _: Request):
        courses = Course.objects.all()
        serialized = CourseSerializer(courses, many=True)

        return Response(serialized.data, status.HTTP_200_OK)

    def post(self, request: Request):
        serialized = CourseSerializer(data=request.data)
        serialized.is_valid(raise_exception=True)
        serialized.save()

        return Response(serialized.data, status.HTTP_201_CREATED)


class CourseIdView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [CoursePermission]

    def patch(self, request: Request, course_id: int):
        course = get_object_or_404(Course, pk=course_id)

        serialized = CourseSerializer(instance=course, data=request.data)
        serialized.is_valid(raise_exception=True)
        serialized.save()

        return Response(serialized.data, status.HTTP_200_OK)

    def put(self, request: Request, course_id: int):
        course = get_object_or_404(Course, pk=course_id)

        serialized = CourseInstructorSerializer(instance=course, data=request.data)
        serialized.is_valid(raise_exception=True)
        course = serialized.save()

        serialized = CourseSerializer(course)

        return Response(serialized.data, status.HTTP_200_OK)

    def delete(self, _: Request, course_id: int):
        course = get_object_or_404(Course, pk=course_id)
        course.delete()

        return Response("", status.HTTP_204_NO_CONTENT)


class CourseStudentsView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [CoursePermission]

    def put(self, request: Request, course_id: int):
        course = get_object_or_404(Course, pk=course_id)

        serialized = CourseStudentsSerializer(instance=course, data=request.data)
        serialized.is_valid(raise_exception=True)
        course = serialized.save()

        serialized = CourseSerializer(course)

        return Response(serialized.data, status.HTTP_200_OK)
