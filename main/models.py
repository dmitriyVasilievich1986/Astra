from django.db import models
from rest_framework import permissions


class ReadOnlyOrAdmin(permissions.BasePermission):
    def has_permission(serlf, request, view):
        if request.method == 'GET' or request.user.username == 'root':
            return True
