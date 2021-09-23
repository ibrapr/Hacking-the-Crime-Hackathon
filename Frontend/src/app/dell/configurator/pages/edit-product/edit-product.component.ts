import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { ActionAlertService } from 'src/app/dell/services/dialogService/action-alert.service';
import { DataTable } from '../../../models/DataTable';
import { Product } from '../../../models/Product';
import { DataService } from '../../../services/DataService/data.service';
import { ProductService } from '../../../services/ProductService/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  dataTable=new DataTable();
public currentProduct: Product ;

productSubscription: Subscription;
productName:string;
isChecked:boolean=true;
public titles :string[]=["Release","Version","Status"];
public rows:any[]=[];
  constructor(private productService:ProductService,private dataService:DataService,private router:Router,private alertService:ActionAlertService) { }

  ngOnInit(): void {

    this.productSubscription=this.dataService.currentProduct.subscribe(currentProduct =>{
      this.currentProduct=currentProduct
      this.productName=this.currentProduct.productName;
      this.dataTable = new DataTable();
      this.dataTable.rows=this.rows;
      this.dataTable.titles = this.titles;
      this.rowbuilder()
    },error => {

    });
   
  }

  rowbuilder(){
    this.rows.length=0;
    this.currentProduct.releases.forEach(element => {
      this.rows.push([element.releaseName,element.version,element.status]);

    })
  }

 ChangeStatus(bool: boolean){

this.isChecked=bool;

}
onNameChange(str: string)
{
  this.productName = str;

}
onStatusChange(status: boolean): void
{
  this.isChecked= status;
}
updateChangesToDb()
{
  if (this.productName == "")
    {
      this.alertService.alert("You must enter a name!", 2500, false, 'center', 'error');
    }
    else
    {
      let obs= this.productService.updateProduct(this.productName,this.currentProduct.id,this.isChecked);
      this.alertService.loadingMenu("Saving...", obs, success =>
      {
        this.alertService.confirmAlert("", "Product updated successfully! Do you want to add releases?", "", "", "", "", yes =>
        {
          this.dataService.changeProduct(this.currentProduct);
          this.router.navigate(['/dell/config/newRelease']);
        }, no =>
        {

        });
      }, error =>
      {
        this.alertService.alert("Failed to save!", 2500, false, 'center', 'error');
      });
    }
  
}
}


