
from django.contrib import admin
from django.urls import path
from rest_framework import routers
from django.conf.urls import include
from .import views
# router=routers.DefaultRouter()
# router.register('api_convert',views.api_convert)
# urlpatterns = [
#     path('', include(router.urls)),
#     # path('', views.api_convert,name='api_convert'),

# ]

urlpatterns = [
     path('', views.api_convert, name='api_convert'),
      ]