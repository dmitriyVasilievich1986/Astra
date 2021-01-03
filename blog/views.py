from django.shortcuts import render
from rest_framework import permissions
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.decorators import action
from .serializer import BlogSerializer
from .models import Blog
from main.models import ReadOnlyOrAdmin
from catalog.models import Catalog
from django.shortcuts import get_object_or_404


class BlogViewSet(ModelViewSet):
    serializer_class = BlogSerializer
    queryset = Blog.objects.all()
    permission_classes = [ReadOnlyOrAdmin]

    @action(detail=True, methods=["GET"])
    def blog_by_catalog(self, request, pk=None, *args, **kwargs):
        queryset = Blog.objects.filter(catalog=pk)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=["GET"])
    def get_blog_info(self, request, pk, *args, **kwargs):
        blog = get_object_or_404(Blog, pk=pk)
        serializer = self.get_serializer(blog, many=False)
        context = serializer.data
        context['is_liked'] = request.user in blog.likes.all()
        return Response(context)

    @action(detail=True, methods=["POST", "GET"], permission_classes=[permissions.IsAuthenticatedOrReadOnly])
    def likes(self, request, pk=None, *args, **kwargs):
        blog = get_object_or_404(Blog, id=pk)
        if request.method == "GET":
            context = {
                "likes": blog.likes.count(),
                "is_liked": request.user in blog.likes.all()
            }
            return Response(context)
        if request.user in blog.likes.all():
            blog.likes.remove(request.user)
        else:
            blog.likes.add(request.user)
        context = {
            "likes": blog.likes.count(),
            "is_liked": request.user in blog.likes.all(),
        }
        return Response(context)

    @action(detail=True, methods=["GET"])
    def blog_by_id(self, request, pk=None, *args, **kwargs):
        catalog = get_object_or_404(Catalog, name=pk)
        queryset = Blog.objects.filter(catalog=catalog)
        names_list = {
            "blogs": [{"name": x.name, "id": x.id, "title": x.title} for x in queryset],
            'catalog_name': catalog.title,
            "full_catalog_name": catalog.full_catalog.title
        }
        return Response(names_list)

    @action(detail=True, methods=["GET"])
    def get_names(self, request, pk=None, *args, **kwargs):
        blog = get_object_or_404(Blog, id=pk)
        catalog = get_object_or_404(Catalog, blog=blog)
        names_list = {
            'catalog_name': catalog.title,
            "full_catalog_name": catalog.full_catalog.title
        }
        return Response(names_list)
