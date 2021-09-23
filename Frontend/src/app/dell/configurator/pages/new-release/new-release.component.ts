import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/dell/models/Product'
import { ActionAlertService } from 'src/app/dell/services/dialogService/action-alert.service';
import { ProductService } from 'src/app/dell/services/ProductService/product.service';
import { DataTable } from '../../../models/DataTable';
import { Release } from '../../../models/Release';
import { DataService } from '../../../services/DataService/data.service';

@Component({
  selector: 'app-new-release',
  templateUrl: './new-release.component.html',
  styleUrls: ['./new-release.component.scss']
})
export class NewReleaseComponent implements OnInit, OnChanges
{

  public update: string = this.router.snapshot.paramMap.get('update');
  public titlePage: string = 'Release - New Release';
  public products: Product[];
  public release: Release = new Release(0, '', false, '');
  currentProduct: Product;
  tempRelease: Release = new Release(0, '', false, '');
  productSubscription: Subscription;
  releaseSubscription: Subscription;
  public title = ['Release', 'Version', 'Status'];
  public rows = [[], []];
  public dataTable = new DataTable();
  public Flag: boolean = false;
  public Flag1: boolean = false;//this.tempRelease.releaseName == ''
  public Flag2: boolean = false;//this.tempRelease.releaseName == ''//this.tempRelease.version == '' 
  public Flag3: boolean = false;
  public Flag4: boolean = false;
  public Flag5: boolean = false;

  trash: Boolean = false;
  edit: Boolean = true;

  canSave = true;
  constructor(private productService: ProductService, private dataService: DataService, private router: ActivatedRoute, private alertService: ActionAlertService, private rout: Router)
  {
    this.updateFunction = this.updateFunction.bind(this);
  }
  ngOnChanges(changes: SimpleChanges): void
  {
    console.log(JSON.stringify(changes))
  }

  ngOnInit(): void
  {
    // Initialize Table
    this.tempRelease.status = false;
    this.dataTable.rows = this.rows;
    this.dataTable.titles = this.title;
    // this.tempRelease=this.release;

    if (this.update == 'true')
    {
      this.titlePage = 'Release - Update Release';
    }

    // Get All Products
    let obsProducts = this.productService.getAllProducts();
    obsProducts.subscribe(products =>
    {
      this.products = products;
      this.updateRows();

    }, error =>
    {
      alert("Error in loading products, newrelease.component.ts");

    });

    // Subscribe the currentProduct to the value saved in the Data Service
    this.productSubscription = this.dataService.currentProduct.subscribe(currentProduct =>
    {
      this.currentProduct = currentProduct;
      if (this.currentProduct.id == undefined || this.currentProduct.id == 0)
      {
        this.canSave = false;
        this.productService.getProductByName(this.currentProduct.productName).subscribe(product =>
        {
          this.canSave = true;
          console.log(this.currentProduct, this.release.releaseName);
          this.currentProduct = product;
        })
      }
      this.updateRows();
    });

    this.releaseSubscription = this.dataService.currentRelease.subscribe(currentRelease =>
    {
      if (currentRelease == null)
      {
        this.release = new Release(0, '', false, '');
      }
      else
      {
        this.release = currentRelease;
        this.tempRelease = currentRelease;
      }
    });
    if (this.currentProduct != undefined)
    {
      this.Flag = true;
    }
    else
    {
      this.tempRelease = new Release(0, '', false, '');
    }
  }

  updateRows()
  {
    if (this.currentProduct != null && this.currentProduct.releases != null)
    {
      this.rows.length = 0;
      this.currentProduct.releases.forEach(rel =>
      {
        this.rows.push([rel.releaseName, rel.version, (rel.status ? "Active" : "InActive")]);
      });
      this.Flag = true;
    }
    else
    {
      this.Flag = false;
    }
  }

  updateFunction(index: number)
  {
  }

  updateProducts(product: Product)
  {
    if (this.currentProduct != null)
    {
      this.Flag = true;
      this.Flag1 = false;
    }
    if (this.currentProduct != product)
    {
      this.dataService.changeProduct(product);
    }
    this.currentProduct = product;
    this.updateRows();
  }

  onNameChange(str: string)
  {
    this.tempRelease.releaseName = str;
    this.Flag2 = false;
  }
  onVersionChange(str: string)
  {
    this.tempRelease.version = str;
    this.Flag3 = false;
  }
  onStatusChange(status: boolean): void
  {
    this.tempRelease.status = status;
  }

  public save(): void
  {
    if(!this.canSave)
    {
      this.alertService.alert("Please wait...",1000,true);
      return;
    }
    if (this.currentProduct == null)
    {
      this.Flag1 = true;
    }
    if (this.tempRelease.releaseName == '')
    {
      this.Flag2 = true;
    }
    if (this.tempRelease.version == '')
    {
      // this.alertService.alert("No release version selected ! Please insert version name", 3000, true, 'center', 'warning');
      // alert("No release version selected ! Please insert version name ...")
      this.Flag3 = true;
      // return;
    }
    if (this.tempRelease.version.match(/^[01]?[0-9][0-9]?.[01]?[0-9][0-9]?.[01]?[0-9][0-9]?.[01]?[0-9][0-9]?$/) || (this.tempRelease.version == ''))
    {
      this.Flag4 = false;


    }
    else{ this.Flag4 = true;
    return}
    
    //  this.alertService.alert("must to insert just number", 2500, false, 'center');
    //new release :

    if (this.update != 'true')
    {
      if (!this.productService.checkSameRelease(this.currentProduct, this.tempRelease))
      {
        // console.log(this.currentProduct.id, this.tempRelease)
        let obs = this.productService.addNewRelease(this.currentProduct.id, this.tempRelease)
        this.alertService.loadingMenu("Saving...", obs, success =>
        {
          this.alertService.alert("Release added successfully!", 2500, false, 'center');
          this.currentProduct.releases.push(this.tempRelease);
          this.updateRows();
          this.rout.navigate(['/dell/config/releases']);
        }, error =>
        {
          this.alertService.alert("Failed to save!", 2500, false, 'center', 'error');
        });
      }
      else
      {
        this.alertService.alert("Release already exists!", 3000, false, 'center', 'error');
      }
    }
    else
    {
      //  update release :
      let obs = this.productService.updateRelease(this.currentProduct.id, this.tempRelease)
      this.alertService.loadingMenu("Saving...", obs, success =>
      {
        this.alertService.alert("Release updated successfully!", 2500, false, 'center');
        this.updateRows();
        this.rout.navigate(['/dell/config/releases']);
      }, error =>
      {
        this.alertService.alert("Failed to save!", 2500, false, 'center', 'error');
      });
    }
  }

  public cancel(): void
  {
    this.dataService.changeProduct(null);
    this.dataService.changeRelease(null);
    this.rout.navigate(['/dell/config/releases']);
  }
  OnlyNumberAllowed(event): boolean
  {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 47 || charCode > 58) && charCode != 46)
    {

      this.Flag5 = true;
      return false;
    }
    this.Flag5 = false;
    return true;


  }
}