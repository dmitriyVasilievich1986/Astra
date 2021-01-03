from django.db import models
from full_catalog.models import FullCatalog


class Catalog(models.Model):
    name = models.CharField(max_length=150, unique=True)
    title = models.CharField(max_length=150, blank=True, null=True)
    full_catalog = models.ForeignKey(FullCatalog, on_delete=models.CASCADE)
