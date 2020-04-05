
from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from api import views
urlpatterns = [
    path('admin/', admin.site.urls),
    # path('', include('api.urls')),
    path('api_convert/', views.api_convert,name='api_convert'),

    # path('signin/', views.api_signin, name='api_signin'),


]
