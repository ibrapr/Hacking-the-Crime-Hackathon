
import { Component, OnInit } from '@angular/core';
import { DataTable } from '../../../models/DataTable';
import { Product } from '../../../models/Product';
import { ActionAlertService } from '../../../services/dialogService/action-alert.service';
import { DataService } from '../../../services/DataService/data.service';
import { ProductService } from '../../../services/ProductService/product.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Injectable } from '@angular/core'; import { Release } from '../../../models/Release';
import { data } from 'jquery';
Injectable

@Component({
  selector: 'app-configurator-products-page',
  templateUrl: './configurator-products-page.component.html',
  styleUrls: ['./configurator-products-page.component.scss']
})


export class ConfiguratorProductsPageComponent implements OnInit {
  trash: Boolean = true;
  edit: Boolean = true;
  products: Product[] = [];
  loading = false;
  index = 0;
  titles = ['Name', 'Status'];
  public rows: any = [];
  dataTable = new DataTable()
  currentProduct: Product;
  productSubscription: Subscription;

statusString:String;

  constructor(private productService: ProductService, private dataService: DataService, private actionAlert: ActionAlertService
    , private router: Router) {
    this.deleteRow = this.deleteRow.bind(this);
    this.updateFunction = this.updateFunction.bind(this);
  }

  ngOnInit(): void {
    this.dataService.changeProduct(null);
    

    this.dataTable.rows = this.rows;
    this.dataTable.titles = this.titles;
    this.dataTable = new DataTable();
    // Get All Products
    let obsProducts = this.productService.getAllProducts();
    obsProducts.subscribe(data => {
      this.products = data;
      this.dataTable = new DataTable();
      this.dataTable.rows = this.rows;
      this.dataTable.titles = this.titles;
      // Add loading?
      this.updateRows();
    }, error => {

    });
     // Tables
  
    // const rel1=new Release(1,"firstrelease",true,"1.0","10.12.99");
    // const releases:Release[]=[];
    // releases.push(rel1);
    // const product=new Product(2,"pc",true,releases,null);
    // this.products.push(product);
    //  this.productSubscription = this.dataService.currentProduct.subscribe(currentProduct => {
    //    this.currentProduct = currentProduct
    //  });

  }
  ngOnDestroy(): void {
    // this.productSubscription.unsubscribe();
  }
  updateRows() {

    this.rows.length = 0;
    this.products.forEach(element => {
      if(element.status==false)
      {
        this.statusString="Inactive";
      }
      else
      {
        this.statusString="Active"
      }
      this.rows.push([element.productName, this.statusString]);
    });
    this.dataTable = new DataTable();
    this.dataTable.rows = this.rows;
    this.dataTable.titles = this.titles;
  }
  deleteRow(index: number) {
    this.index = index;
    this.actionAlert.confirmAlert('',
      'Are you sure you want to unactivate the product ' + this.products[index].productName + '?',
      '',
      'Product has been unactivated',
      'Your imaginary file is safe :)',
      ' Product has not been unactivated',
      success => {
        this.productService.deleteProduct(this.products[index].id).subscribe(() => {
          this.products[index].status=false;
          this.updateRows();


          // this.updateRows();
           
        });
        // this.products.splice(index, 1);
      },
      failure => { },'warning'
    )
  }
  updateFunction(index: number) {
    this.dataService.changeProduct(this.products[index]);
    this.router.navigate(['/dell/config/editProduct', { update: 'true' }]);
  }

}

