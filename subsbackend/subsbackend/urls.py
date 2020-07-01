from django.contrib import admin
from django.urls import path, include                
from rest_framework import routers                  
from subs import views

router = routers.DefaultRouter()
router.register(r'subs', views.SubView, 'subs')

urlpatterns = [path('admin/', admin.site.urls), path('api/', include(router.urls))]