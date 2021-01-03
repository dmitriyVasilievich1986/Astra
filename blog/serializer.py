from .models import Blog
from rest_framework import serializers


class BlogSerializer(serializers.ModelSerializer):
    likes_count = serializers.SerializerMethodField('get_likes_count')

    class Meta:
        model = Blog
        fields = ('id', 'name', 'title', 'HTMLText', 'catalog', 'created_at', 'updated_at', 'likes_count')

    def get_likes_count(self, obj, *args, **kwargs):
        return obj.likes.count()
