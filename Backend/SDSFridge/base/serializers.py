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