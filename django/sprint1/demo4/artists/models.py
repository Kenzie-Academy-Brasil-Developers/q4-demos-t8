from uuid import uuid4

from django.db import models


class Artist(models.Model):
    name = models.CharField(max_length=50)
    birth_date = models.DateField(null=True)
