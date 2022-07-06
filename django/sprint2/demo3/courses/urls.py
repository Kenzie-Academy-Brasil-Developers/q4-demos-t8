from django.urls import path

from courses.views import CourseIdView, CourseView

urlpatterns = [
    path("courses/", CourseView.as_view()),
    path("courses/<int:course_id>/", CourseIdView.as_view()),
]
