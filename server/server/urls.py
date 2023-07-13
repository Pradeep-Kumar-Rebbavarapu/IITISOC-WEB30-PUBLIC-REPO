
from django.contrib import admin
from django.urls import path,include
from .views import GoogleLogin
from django.conf import settings
from django.conf.urls.static import static
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/',include('api.urls')),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),
    path('dj-rest-auth/google/', GoogleLogin.as_view(), name='google_login'),
    path(r'^accounts/', include('allauth.urls'), name='socialaccount_signup'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
