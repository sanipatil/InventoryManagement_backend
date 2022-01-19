
# Shopify Inventory Management

## Description

Provides DRF api to perform CRUD operations for inventory tracking web application for a logistics company and store product information in MySQL database.

To load the MySQL database, import the inventory_management.sql file in your MySQL database.

# Installation
## Python
Install the latest version of python from https://www.python.org/downloads/


## Django REST framework

```bash
pip install django
pip install djangorestframework
```



## Build and Run
1. Go to settings.py under ShopifyInventoryMgmt folder and in settings.py update DATABASES variable, add your local MySQL username and password in which the inventory_management.sql file is imported.
2. Furthur, under the settings.py update FILE_PATH, add your file path where you want to export the CSV. 
3. After these changes, run the following command.

```python
cd ShopifyInventoryMgmt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```