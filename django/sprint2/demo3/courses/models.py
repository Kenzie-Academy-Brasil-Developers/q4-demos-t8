from statistics import mode

from django.db import models


class TypeCourse(models.TextChoices):
    BE = "backend"
    FE = "frontend"
    FS = "fullstack"


class Course(models.Model):
    name = models.CharField(max_length=90, unique=True)
    type = models.CharField(
        max_length=60, choices=TypeCourse.choices, default=TypeCourse.FS
    )

    instructor = models.OneToOneField(
        "users.User", null=True, related_name="course", on_delete=models.SET_NULL
    )
    users = models.ManyToManyField("users.User", related_name="courses")
