from django.shortcuts import render
from rest_framework import viewsets          
from .serializers import SubSerializer, InventorySerializer      
from .models import Subs, Inventory
from django.http.response import JsonResponse

# Create your views here

class SubView(viewsets.ModelViewSet):
	"""
	API endpoint to access ingredient substitutions (all or based on a specific name)
	"""
	queryset = Subs.objects.all().order_by('subname')
	serializer_class = SubSerializer
	
	def get_queryset(self):
		req = self.request
		subname = req.query_params.get('subname')
		
		if subname:
			self.queryset = self.queryset.filter(subname=subname)
		return self.queryset
		

class InventoryView(viewsets.ModelViewSet):
	"""
	API endpoint to acess a user's ingredient inventory (pantry in frontend)
	"""
	queryset = Inventory.objects.all()
	serializer_class = InventorySerializer