from django.conf.urls import url
from django.urls import path, include
from django.contrib import admin
from django.views.generic import TemplateView

urlpatterns = [
    path('api/', include('server.api.urls')),
    path('auth/', include('rest_auth.urls')),
    path('auth/registration/', include('rest_auth.registration.urls')),
    path('admin/', admin.site.urls),
    url(r'^.*$', TemplateView.as_view(template_name="index.html"), name='index'),
]
