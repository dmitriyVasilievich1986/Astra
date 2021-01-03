from django.db import models


class FullCatalog(models.Model):
    name = models.CharField(max_length=150, unique=True)
    title = models.CharField(max_length=150, blank=True, null=True)
