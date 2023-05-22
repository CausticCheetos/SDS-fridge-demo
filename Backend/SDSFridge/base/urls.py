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
    path('heater/', views.get_heater, name='get_heater'),
    path('rtp/<int:greater>/<int:lesser>',views.get_past_rtp, name = 'get_past_rtp'),
    path('rtp/',views.get_rtp, name = 'get_rtp'),
    path('maxigauge/latest/',views.get_maxigauge_latest, name = 'get_maxigauge_latest'),
    path('valves/latest/',views.get_valves, name = 'get_valves'),
    path('parameters/',views.post_parameters, name = 'post_parameters'),
    path('getParameters/',views.get_parameters, name = 'get_parameters'),
    path('deleteParameters/<str:call>',views.delete_parameters, name = 'delete_parameters')
]