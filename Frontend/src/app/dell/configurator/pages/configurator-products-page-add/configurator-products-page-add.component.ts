import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/dell/models/Product';
import { DataService } from 'src/app/dell/services/DataService/data.service';
import { ProductService } from '../../../services/ProductService/product.service';
import { Subscription } from 'rxjs';
import { ActionAlertService } from 'src/app/dell/services/dialogService/action-alert.service';

@Component({
  selector: 'app-configurator-products-page-add',
  templateUrl: './configurator-products-page-add.component.html',
  styleUrls: ['./configurator-products-page-add.component.scss']
})
export class ConfiguratorProductsPageAddComponent implements OnInit
{
  public product: Product = new Product(0, '', true, null, null);

  public Flag: boolean = false;

  constructor(private productservice: ProductService, private dataService: DataService, private router: Router, private alertService: ActionAlertService) { }

  ngOnInit(): void
  {
  }

  onNameChange(str: string)
  {
    
    this.product.productName = str;    
    
  }
  onStatusChange(status: boolean)
  {
    this.product.status = status;
  }
  public saveButton()
  {
    if (this.product.productName == "")
    {
      
      this.alertService.alert("You must enter a name!", 2500, false, 'center', 'error');

         
     }
    else
    {
      let obs = this.productservice.addProduct(this.product.productName, this.product.status);
      this.alertService.loadingMenu("Saving...", obs, success =>
      {
        this.productservice.getProductByName(this.product.productName).subscribe(product=>{
          this.product = product;
          this.alertService.confirmAlert("", "Product added successfully! Do you want to add releases?", "", "", "", "", yes =>
          {
            this.dataService.changeProduct(this.product);
            this.router.navigate(['/dell/config/newRelease']);
          }, no =>
          {
  
          });
        })
      }, error =>
      {
        this.alertService.alert("Failed to save!", 2500, false, 'center', 'error');
      });
    }
  }
  }
