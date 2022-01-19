from django.shortcuts import render
from django.http import HttpResponse, FileResponse
from Inventory.models import Product
from django.views.decorators.csrf import csrf_exempt
from ShopifyInventoryMgmt.settings import FILE_PATH
import time
import json
import csv

# Create your views here.
@csrf_exempt
def createInventoryProduct(request):
    try:
        request = request.body.decode('utf-8')
        request = json.loads(request)
        product_name = request['product_name']
        product_inventory_instock = request['product_inventory_instock']
        product_price = request['product_price']
        created_on = time.time()
        new_product_object = Product(
            productname=product_name,
            productinventoryinstock=product_inventory_instock,
            productprice=product_price,
            created_on=created_on,
            updated_on=created_on
        )
        new_product_object.save()
        return HttpResponse(json.dumps({'status': 'success'}))
    except Exception as e:
        return HttpResponse(str(e))

@csrf_exempt
def editInventoryProduct(request):
    try:
        request = request.body.decode('utf-8')
        request = json.loads(request)
        product_id = request['product_id']
        product_name = request['product_name']
        product_inventory_instock = request['product_inventory_instock']
        product_price = request['product_price']
        updated_on = time.time()
        existingProducts = Product.objects.get(productid=product_id)
        Product.objects.filter(productid=product_id).update(productname=product_name if product_name else existingProducts.productname,
                                productinventoryinstock=product_inventory_instock if product_inventory_instock else existingProducts.productinventoryinstock,
                                productprice=product_price if product_price else existingProducts.productprice,
                                updated_on=updated_on)
        return HttpResponse(json.dumps({'status': 'success'}))
    except Exception as e:
        return HttpResponse(str(e))

@csrf_exempt
def deleteInventoryProduct(request):
    try:
        request = request.body.decode('utf-8')
        request = json.loads(request)
        product_id = request['product_id']
        Product.objects.get(productid=product_id).delete()
        return HttpResponse(json.dumps({'status': 'success'}))
    except Exception as e:
        return HttpResponse(str(e))

@csrf_exempt
def viewInventoryProduct(request):
    try:
        listProducts = Product.objects.values()
        return HttpResponse(json.dumps(list(listProducts)))
    except Exception as e:
        return HttpResponse(str(e))

@csrf_exempt
def exportToCsvProducts(request):
    try:
        file_name = FILE_PATH + 'output.csv'
        listProducts_db = Product.objects.values()
        data = list(listProducts_db)
        return HttpResponse(json.dumps(data))
    except Exception as e:
        return HttpResponse(str(e))