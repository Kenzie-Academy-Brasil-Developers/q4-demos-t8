from uuid import uuid4

from django.db import models


class Artist(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    name = models.CharField(max_length=50)
    birth_date = models.DateField(null=True)

