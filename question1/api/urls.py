from django.contrib import admin
from django.urls import path,include
from .views import *
urlpatterns = [
   path('categories/<categoryname>/products/',ProductsView.as_view()),
   path('categories/<categoryname>/products/<productid>/',ProductDetailsView.as_view())
]
