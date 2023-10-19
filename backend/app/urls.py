from django.urls import path
from .views import NodeViewSet

urlpatterns = [
    path('api/', NodeViewSet.as_view(), name='NodeViewSet'),
]