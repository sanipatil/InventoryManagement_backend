import { Component } from "@angular/core";
import { InventoryService } from "./app.service";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "Logistics Management";
  status: any;
  listProducts: any;
  allProducts: any;
  createFormdata: any;
  updateFormdata: any;
  deleteFormdata: any;
  createStatus: any;
  updateStatus: any;
  deleteStatus: any;
  blob: any;

  constructor(private readonly inventoryService: InventoryService) {
    this.inventoryService.viewProducts().subscribe((value) => {
      this.allProducts = value;
    });
    this.createFormdata = new FormGroup({
      createproductname: new FormControl(""),
      createproductinventoryinstock: new FormControl(""),
      createproductprice: new FormControl(""),
    });
    this.updateFormdata = new FormGroup({
      updateproducts: new FormControl(""),
      updateproductname: new FormControl(""),
      updateproductinventoryinstock: new FormControl(""),
      updateproductprice: new FormControl(""),
    });
    this.deleteFormdata = new FormGroup({
      deleteproducts: new FormControl(""),
    });
  }

  getProductId(productname) {
    return this.allProducts.find((item) => item.productname === productname)
      .productid;
  }

  createProduct(data) {
    this.createStatus = false;
    let productname = data.createproductname;
    let productinventoryinstock = data.createproductinventoryinstock;
    let productprice = data.createproductprice;
    this.inventoryService
      .createProduct(productname, productinventoryinstock, productprice)
      .subscribe((value) => {
        let status = value["status"];
        if (status === "success") {
          this.createStatus = true;
        }
      });
    this.inventoryService.viewProducts().subscribe((value) => {
      this.allProducts = value;
    });
    this.createFormdata.reset();
  }

  updateProduct(data) {
    this.updateStatus = false;
    let productid = this.getProductId(data.updateproducts);
    let productname = data.updateproductname;
    let productinventoryinstock = data.updateproductinventoryinstock;
    let productprice = data.updateproductprice;
    this.inventoryService
      .updateProduct(
        productid,
        productname,
        productinventoryinstock,
        productprice
      )
      .subscribe((value) => {
        let status = value["status"];
        if (status === "success") {
          this.updateStatus = true;
        }
      });
    this.inventoryService.viewProducts().subscribe((value) => {
      this.allProducts = value;
    });
    this.updateFormdata.reset();
  }

  deleteProduct(data) {
    this.deleteStatus = false;
    let productid = this.getProductId(data.deleteproducts);
    this.inventoryService.deleteProduct(productid).subscribe((value) => {
      let status = value["status"];
      if (status === "success") {
        this.deleteStatus = true;
      }
    });
    this.inventoryService.viewProducts().subscribe((value) => {
      this.allProducts = value;
    });
    this.deleteFormdata.reset();
  }

  viewProducts() {
    this.listProducts = this.allProducts;
  }

  convertToCSV(objArray, headerList) {
    let str = "";
    str += headerList.join(",") + "\r\n";
    for (let i = 0; i < objArray.length; i++) {
      let line = Object.values(objArray[i]).join(",");
      str += line + "\r\n";
    }
    return str;
  }

  downloadFile(data, filename) {
    let csvData = this.convertToCSV(data, Object.keys(data[0]));
    let blob = new Blob(["\ufeff" + csvData], {
      type: "text/csv;charset=utf-8;",
    });
    let downloadLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    downloadLink.setAttribute("href", url);
    downloadLink.setAttribute("download", filename + ".csv");
    downloadLink.style.visibility = "hidden";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  exportToCsv() {
    this.downloadFile(this.allProducts, "final_export_file");
  }
}
