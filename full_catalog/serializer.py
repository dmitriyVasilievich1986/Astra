from rest_framework import serializers
from .models import FullCatalog


class FullCatalogSerializer(serializers.ModelSerializer):
    class Meta:
        model = FullCatalog
        fields = '__all__'
