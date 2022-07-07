from django.urls import path

from courses.views import CourseIdView, CourseStudentsView, CourseView

urlpatterns = [
    path("courses/", CourseView.as_view()),
    path("courses/<int:course_id>/", CourseIdView.as_view()),
    path("courses/<int:course_id>/students/", CourseStudentsView.as_view()),
]
