# from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name = 'home'),
    path('fridge/<str:pk>/', views.fridge, name = 'fridge'),
    # path('flow1/', views.FlowApi),
    path('flow/', views.get_flow, name='get_flow'),
    path('pulsetube/', views.get_pulsetube, name='get_plusetube'),
    path('aflow/', views.getActualFlow, name='get_aflow'),
    path('maxigauge/', views.get_maxigauge, name = 'get_maxigauge'),
    path('heater/', views.get_heater, name='get_heater')
]