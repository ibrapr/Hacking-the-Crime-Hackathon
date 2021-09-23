import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataTable } from 'src/app/dell/models/DataTable';
import { Product } from 'src/app/dell/models/Product';
import { Release } from 'src/app/dell/models/Release';
import { DataService } from 'src/app/dell/services/DataService/data.service';
import { ActionAlertService } from 'src/app/dell/services/dialogService/action-alert.service';
import { ProductService } from 'src/app/dell/services/ProductService/product.service';

@Component({
  selector: 'app-dashboardconfig',
  templateUrl: './dashboardconfig.component.html',
  styleUrls: ['./dashboardconfig.component.scss']
})
export class DashboardconfigComponent implements OnInit {
  trash: Boolean = false;
  edit: Boolean = false;

  public products: Product[] = [];
  public release: Release[]=[];

  public title = ['Release','Product Name', 'Version', 'Status'];
  public rows = [];
  public dataTable = new DataTable();
 
  constructor(private productService: ProductService, private dataService: DataService, 
    private router: Router, private actionAlert: ActionAlertService) {

  }

  ngOnInit(): void {

    this.dataTable.rows = this.rows;
    this.dataTable.titles = this.title;
    let obsRelease = this.productService.getAllReleasesWithoutParameter();
    obsRelease.subscribe(product=>{
      this.products=product;
      this.dataTable = new DataTable();
      this.dataTable.rows = this.rows;
      this.dataTable.titles = this.title;
      this.updateRows();

    }, error => {
      this.actionAlert.alert("Error in loading releases, dashboard. " + error, 3000, true, 'top','error');

    });


  }
  
  updateRows() {
    this.rows.length = 0;
    this.products.forEach(prod => {
      prod.releases.forEach(rel => {
        this.rows.push([rel.releaseName,prod.productName, rel.version, (rel.status?"Active":"Inactive")]);
      });
    });
  }

 
}
