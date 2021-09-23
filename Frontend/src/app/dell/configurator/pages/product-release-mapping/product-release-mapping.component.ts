import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/dell/models/Product'
import { Parameter } from 'src/app/dell/models/Parameter'
import { ParameterService } from 'src/app/dell/services/ParameterService/parameter.service';
import { DataTable } from '../../../models/DataTable';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/dell/services/DataService/data.service';
import { Injectable } from '@angular/core'; Injectable
import { ActionAlertService } from '../../../services/dialogService/action-alert.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-release-mapping',
  templateUrl: './product-release-mapping.component.html',
  styleUrls: ['./product-release-mapping.component.scss']
})
export class ProductReleaseMappingComponent implements OnInit, OnDestroy
{
  trash: Boolean = true;
  edit: Boolean = true;

  public params: Parameter[] = [];

  currentProduct: Product;
  productSubscription: Subscription;

  index = 0;

  paramMappingButtonDisabled = true;
  paramMappingButtonText = "New Param Mapping";
  public title = ['Param Name'];
  public rows = [[""]];
  public dataTable = new DataTable();
  
  loading = false;
  constructor(private paramService: ParameterService, private dataService: DataService, private router: Router,
    private actionAlert: ActionAlertService)
  {
    this.deleteFunction = this.deleteFunction.bind(this);
    this.updateFunction = this.updateFunction.bind(this);
  }
  ngOnInit(): void
  {
    // Initialize Table
    this.resetTable();
    // this.actionAlert.alert("testing 21312412342113",2000, true, "top-end","warning");

    // Subscribe the selectedProduct to the value saved in the Data Service
    this.productSubscription = this.dataService.currentProduct.subscribe(currentProduct =>
    {
      this.currentProduct = currentProduct;
      if((this.currentProduct != null && 
        this.currentProduct.releases != null && this.currentProduct.releases.length > 0))
        {
          this.paramMappingButtonDisabled = false;
          this.paramMappingButtonText = "New Param Mapping";
        }
        else
        {
          this.paramMappingButtonDisabled = true;
          this.paramMappingButtonText = "Product Must Have Releases";
          

        }
      this.updateParams();
    });
    // Subscribe the currentParameter to the value saved in the Data Service

  }

  private resetTable()
  {
    this.dataTable = new DataTable();
    this.dataTable.rows = this.rows;
    this.dataTable.titles = this.title;
  }

  // We must unsubscribe before the component gets destroyed!
  ngOnDestroy(): void
  {
    this.productSubscription.unsubscribe();
  }

  /**
   * Update the parameter list based on the currently selected product
   */
  updateParams()
  {
    if (this.currentProduct != null)
    {
      // this.params = this.currentProduct.parameters;
      this.loading = true;
      this.paramService.getAllParametersByProductId(this.currentProduct.id).subscribe(params =>
      {
        this.loading = false;
        this.params = params;
        // this.actionAlert.alert(this.params.length + " parameters loaded", 1500, true, 'top-end', 'success');
        this.updateRows();
        // Add loading?
      }, error =>
      {
        this.actionAlert.confirmAlert("", "Failed to load parameters. Try again?", "", "", "", "", success =>
        {
          this.updateParams();
        }, failure =>
        {

        }, 'error')
      });
    }
    else
    {
      this.params = null
    }
      
    
  }

  /**
   * Update the rows in the table
   */
  updateRows()
  {
    this.dataTable = new DataTable();
    this.dataTable.rows = this.rows;
    this.dataTable.titles = this.title;
    this.rows.length = 0;
    this.params.forEach(element =>
    {
      this.rows.push([element.parameterName]);
    });
  }

  /**
   * Function that gets called when the update/edit icon is pressed.
   * @param index 
   */
  updateFunction(index: number)
  {
    this.dataService.changeParameter(this.params[index]);
    this.router.navigate(['/dell/config/newParamMapping'])
  }


  /**
   * Function that gets called when the delete icon is pressed.
   * @param index 
   */
  deleteFunction(index: number)
  {
    this.index = index;
    this.actionAlert.confirmAlert('',
      'Are you sure want to remove the parameter ' + this.params[index].parameterName + ' from ' + this.currentProduct.productName + '?',
      '',
      'Parameter has been deleted',
      '',
      'Parameter has not been deleted',
      success =>
      {
        this.paramService.deleteProductParam(this.currentProduct.id, this.params[index].id).subscribe(res=>
          {
            if(res)
            { 
              this.params.splice(this.index, 1);
              this.updateRows();
            }
            
          });
      },
      failure => { }, 'warning'
    )
  }


}