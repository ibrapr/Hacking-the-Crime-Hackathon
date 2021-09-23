import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataTable } from '../../../models/DataTable';
import { Product } from '../../../models/Product';
import { Release } from '../../../models/Release';
import { DataService } from '../../../services/DataService/data.service';
import { ProductService } from '../../../services/ProductService/product.service';

@Component({
  selector: 'app-releases',
  templateUrl: './releases.component.html',
  styleUrls: ['./releases.component.scss']
})
export class ReleasesComponent implements OnInit {

  trash: Boolean = false;
  edit: Boolean = true;

  public products: Product[] = [];

  public title = ['Release','Product Name', 'Version', 'Status'];
  public rows = [["Temp"], ["Temp"]];
  public dataTable = new DataTable();
  currentProduct: Product;
  productSubscription: Subscription;
  currentRelease: Release;
  ReleaseSubscription: Subscription;

  constructor(private productService: ProductService, private dataService: DataService, private router: Router) {
    this.updateFunction = this.updateFunction.bind(this);
  }

  ngOnInit(): void {

    this.dataTable.rows = this.rows;
    this.dataTable.titles = this.title;

    let obsProducts = this.productService.getAllProducts();
    obsProducts.subscribe(products => {
      this.products = products;
      this.dataTable = new DataTable();
      this.dataTable.rows = this.rows;
      this.dataTable.titles = this.title;
      this.updateRows();
    }, error => {
      alert("Error in loading products, releases.component.ts" + error);

    });
    // Subscribe the currentProduct to the value saved in the Data Service
    this.productSubscription = this.dataService.currentProduct.subscribe(currentProduct => {
      this.currentProduct = currentProduct
    });
    this.ReleaseSubscription = this.dataService.currentRelease.subscribe(currentRelease => {
      this.currentRelease = currentRelease
    });
  }
  // We must unsubscribe before the component gets destroyed!
  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
    this.ReleaseSubscription.unsubscribe();
  }

  updateRows() {
    this.rows.length = 0;
    this.products.forEach(prod => {
      prod.releases.forEach(rel => {
        this.rows.push([ rel.releaseName,prod.productName, rel.version, (rel.status?"Active":"Inactive")]);
      });
    });
  }

  updateFunction(index: number) {

    let counter: number = 0
    this.products.forEach(product => {
      product.releases.forEach(rel => {
        if (counter == index) {
          this.dataService.changeProduct(product);
          this.dataService.changeRelease(rel);
          counter++;
        }
        else {
          counter++;
        }

      })
    })
    this.router.navigate(['/dell/config/newRelease', { update: 'true' }]);
  }

  GoToNewRelease() {
    this.dataService.changeProduct(null);
    this.dataService.changeRelease(null);
    this.router.navigate(['/dell/config/newRelease']);
  }
}
