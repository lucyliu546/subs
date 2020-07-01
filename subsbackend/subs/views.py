from django.shortcuts import render
from rest_framework import viewsets          # add this
from .serializers import SubSerializer      # add this
from .models import Subs  
from django.http.response import JsonResponse

# Create your views here

class SubView(viewsets.ModelViewSet):
    queryset = Subs.objects.all().order_by('subname')
    serializer_class = SubSerializer
    
    def get_queryset(self):
        req = self.request
        subname = req.query_params.get('subname')
        print(subname)
        if subname:
            self.queryset = self.queryset.filter(subname=subname)
        return self.queryset
        

