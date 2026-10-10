from django.urls import path

from . import views

urlpatterns = [
    path("status/", views.status, name="status"),
    path("health/", views.health, name="health"),
]
