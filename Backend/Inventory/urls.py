from django.urls import path
from django.conf import settings
from Inventory import views

urlpatterns = [
    path('createInventoryProduct/', views.createInventoryProduct),
    path('deleteInventoryProduct/', views.deleteInventoryProduct),
    path('viewInventoryProduct/', views.viewInventoryProduct),
    path('editInventoryProduct/', views.editInventoryProduct),
    path('exportToCsvProducts/', views.exportToCsvProducts),
]