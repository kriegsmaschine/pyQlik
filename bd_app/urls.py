from django.conf.urls import url
from django.contrib   import admin
from . import views

app_name = "bd_app"
urlpatterns = [
               url(r'^$', views.index, name="index"),
]