from django.db import models
from catalog.models import Catalog
from django.contrib.auth.models import User
from django.conf import settings


class Blog(models.Model):
    name = models.CharField(max_length=100, unique=True)
    title = models.CharField(max_length=100, blank=True, null=True)
    HTMLText = models.TextField()
    catalog = models.ForeignKey(Catalog, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    likes = models.ManyToManyField(settings.AUTH_USER_MODEL)
