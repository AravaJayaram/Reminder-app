"""
URL configuration for backaddition project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from backserver.views import DetailsViewset, UserViewset
from backserver import urls
router=DefaultRouter()
router.register(r'Alarms',DetailsViewset)
router1=DefaultRouter()
router1.register(r'user', UserViewset)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/',include(router.urls)),
    path('userapi/',include(router1.urls)),
    path('app/',include('backserver.urls')),
    path('app/',include('backserver.urls')),
    path('app/',include('backserver.urls')),
    path('app/',include('backserver.urls')),
]
