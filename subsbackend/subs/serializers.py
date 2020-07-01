from rest_framework import serializers
from .models import Subs

class SubSerializer(serializers.ModelSerializer):
      class Meta:
        model = Subs
        fields = ('subname', 'subslist')