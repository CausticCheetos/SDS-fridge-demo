from rest_framework import serializers
from base.models import Flow, Notification

class FlowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flow
        field=('FlowId', 'date', 'value')

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'

class NotificationSerializer(serializers.Serializer):
    email = serializers.EmailField()


class SMSNotificationSerializer(serializers.Serializer): 
    phone_number = serializers.CharField(max_length=15)