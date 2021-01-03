from django.urls import path
from .views import RegisterAPIView, LoginAPIView, UserAPIView, AccountAPIView
from knox import views as knox_views
from rest_framework import routers
from blog.views import BlogViewSet
from catalog.views import CatalogViewSet
from full_catalog.views import FullCatalogViewSet

router = routers.DefaultRouter()
router.register('blog', BlogViewSet)
router.register('catalog', CatalogViewSet)
router.register('fullcatalog', FullCatalogViewSet)

urlpatterns = router.urls + [
    path('auth/register', RegisterAPIView.as_view()),
    path('auth/login', LoginAPIView.as_view()),
    path('auth/user', UserAPIView.as_view()),
    path('auth/account', AccountAPIView.as_view()),
    path('auth/logout', knox_views.LogoutView.as_view()),
]
