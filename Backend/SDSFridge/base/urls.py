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
    path('flow/latest/',views.get_flow_latest, name = 'get_flow_latest'),
    path('valves/latest/',views.get_valves, name = 'get_valves'),
    path('parameters/',views.post_parameters, name = 'post_parameters'),
    path('getParameters/',views.get_parameters, name = 'get_parameters'),
    path('deleteParameters/<str:call>',views.delete_parameters, name = 'delete_parameters'),
    path('putParameters/<str:call>',views.put_parameters, name = 'put_parameters'),
    path('toggle/<str:call>',views.toggle_parameters, name = 'toggle_parameters'),
    path('notifications/<int:pk>/', views.NotificationDetailView.as_view(), name='read_notification'),
    path('notifications/', views.NotificationCreateView.as_view(), name='create_notification'),
    path('update_notifications/<int:pk>/', views.NotificationUpdateView.as_view(), name='update_notification'),
    path('delete_notifications/<int:pk>/', views.NotificationDeleteView.as_view(), name='delete_notification'),
    path('emailDetail/<int:pk>/', views.UserEmailDetailView.as_view(), name = 'emailDetail'),
    path('create_Email/', views.create_email, name = 'create_Email'),
    path('update_Email/<str:call>/', views.put_email, name = 'update_Email'),
    path('delete_Email/<str:call>/', views.delete_email, name = 'delete_Email'),
    path('getEmails/',views.get_emails, name = 'get_emails'),
    # path('send_notification_email/', views.SendNotificationEmailView.as_view(), name='send_notification_email'),
    path('send_specific_notification_email/', views.SendSpecificNotificationEmailView.as_view(), name='end_specific_notification_email'),
    path('send_specific_notification_sms/', views.SendNotificationSMSView.as_view(), name = 'send_specific_notification_sms')
]