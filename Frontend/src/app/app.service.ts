import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class InventoryService {

  constructor(private readonly httpClient: HttpClient) { }

  createProduct(pname,pinstock,pprice) {
    return this.httpClient.post(`${environment.apiUrl}Inventory/createInventoryProduct/`,
    JSON.stringify(
      {
        'product_name':pname,
        'product_inventory_instock':pinstock,
        'product_price':pprice
      }),
    httpOptions);
  }

  updateProduct(pid, pname,pinstock,pprice) {
    return this.httpClient.post(`${environment.apiUrl}Inventory/editInventoryProduct/`,
    JSON.stringify(
      {
        'product_id': pid, 
        'product_name':pname,
        'product_inventory_instock':pinstock,
        'product_price':pprice
      }),
    httpOptions);
  }

  deleteProduct(pid) {
    return this.httpClient.post(`${environment.apiUrl}Inventory/deleteInventoryProduct/`,
    JSON.stringify(
      {
        'product_id':pid
      }),
    httpOptions);
  }

  viewProducts() {
    return this.httpClient.get(`${environment.apiUrl}Inventory/viewInventoryProduct/`);
  }

  exportToCsv() {
    return this.httpClient.get(`${environment.apiUrl}Inventory/exportToCsvProducts/`);
  }
}
