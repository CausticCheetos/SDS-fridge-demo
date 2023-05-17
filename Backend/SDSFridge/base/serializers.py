from rest_framework import serializers
from base.models import Flow

class FlowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flow
        field=('FlowId', 'date', 'value')