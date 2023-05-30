from rest_framework import serializers
from base.models import Flow, Notification, UserEmail, UserPhone

class FlowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flow
        field=('FlowId', 'date', 'value')

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'

class UserEmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserEmail
        fields = ('UserEmailId', 'EmailAddress')

class UserPhoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPhone
        fields = '__all__'

class ENotificationSerializer(serializers.Serializer):
    email = serializers.EmailField()

class EmailSerializer(serializers.Serializer):
    emails = serializers.ListField(child=serializers.EmailField())
    notification_id = serializers.IntegerField()


class EmailSerializer(serializers.Serializer):
    # email = serializers.EmailField()
    notification_id = serializers.IntegerField()

class SMSNotificationSerializer(serializers.Serializer): 
    phone_number = serializers.CharField(max_length=15)
    notification_id = serializers.IntegerField()