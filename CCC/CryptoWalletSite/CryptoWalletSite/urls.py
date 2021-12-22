from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from users.forms import CustomUserCreationForm
from users.views import HomeWithForm, SignIN, CompareWithForm, NewsWithForm

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('users/', include('django.contrib.auth.urls')),
    path('users/', include('users.urls')),
    path('', HomeWithForm.as_view(), name='home'),
    path('home/', HomeWithForm.as_view()),
    path('news/', NewsWithForm.as_view(), name='news'),
    path('compare/', CompareWithForm.as_view(), name='compare'),
    path('login/' , SignIN , name = 'signin' ),
]