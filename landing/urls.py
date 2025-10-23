from django.urls import path
from . import views

urlpatterns = [
    path('', views.landing_page, name='landing'),
    path('success/', views.success_page, name='success'),
]
