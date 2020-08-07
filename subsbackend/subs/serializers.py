from rest_framework import serializers
from .models import Subs, Inventory

class SubSerializer(serializers.ModelSerializer):
	class Meta:
		model = Subs
		fields = ('subname', 'subslist')

class InventorySerializer(serializers.ModelSerializer):
	class Meta:
		model = Inventory
		fields = ('session', 'item')