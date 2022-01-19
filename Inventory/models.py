from django.db import models

# Create your models here.
class Product(models.Model):
    productid = models.AutoField(db_column='productId', primary_key=True)  # Field name made lowercase.
    productname = models.TextField(db_column='productName')  # Field name made lowercase.
    productinventoryinstock = models.IntegerField(db_column='productInventoryInStock')  # Field name made lowercase.
    productprice = models.FloatField(db_column='productPrice')  # Field name made lowercase.
    created_on = models.CharField(max_length=1000)
    updated_on = models.CharField(max_length=1000)

    class Meta:
        managed = False
        db_table = 'Product'