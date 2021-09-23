import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Parameter } from 'src/app/dell/models/Parameter'
import { ReleaseValue } from 'src/app/dell/models/ReleaseValue';
import { ActionAlertService } from 'src/app/dell/services/dialogService/action-alert.service';
import { ParameterService } from 'src/app/dell/services/ParameterService/parameter.service';
import { ProductService } from 'src/app/dell/services/ProductService/product.service';
import { DataTable } from '../../../models/DataTable';
import { Product } from '../../../models/Product';
import { Release } from '../../../models/Release';
import { SelectBoxItem } from '../../../models/SelectBoxItem';
import { Value } from '../../../models/Value';
import { DataService } from '../../../services/DataService/data.service';

@Component({
  selector: 'app-new-param-mapping',
  templateUrl: './new-param-mapping.component.html',
  styleUrls: ['./new-param-mapping.component.scss']
})
export class NewParamMappingComponent implements OnInit
{
  public parameters: Parameter[] = [];
  public currentParameter: Parameter;

  currentProduct: Product;
  productSubscription: Subscription;
  parameterSubscription: Subscription;

  releases: Release[] = [];


  releaseValues: ReleaseValue[];

  startIndices: number[] = [];
  endIndices: number[] = [];

  paramMappedToProduct: boolean = false;

  public title = ['Value'];
  public rows = [[""]];


  changingProduct = false;

  // This is used as an input to trigger setting the end releases in the ParamReleaseMappingTable
  calculateEndReleases = false;
  constructor(private dataService: DataService, private router: Router, private productService: ProductService, private alertService: ActionAlertService) { }

  ngOnInit(): void
  {
    this.dataService.currentProduct.subscribe(product =>
    {
      this.updateProduct(product);
    })
    this.dataService.currentParameter.subscribe(parameter =>
    {
      this.currentParameter = parameter;
      if (this.currentParameter != null)
      {
        this.updateReleaseValues();
      }
    })
  }

  updateProduct(currentProduct: Product)
  {
    this.currentProduct = currentProduct;
    if (this.currentProduct != null)
    { // Make sure to get the sorted releases...
      this.productService.getAllReleases(this.currentProduct.id).subscribe(releases =>
      {
        this.releases = releases;
        // this.alertService.alert("loaded releases", 2000, true);
      });
    }
    this.changingProduct = false;
    if (this.currentParameter != null)
    {
      this.updateReleaseValues();
    }
    this.updateRows();
  }
  updateReleaseValues()
  {
    // this.startIndices = new Array<number>(this.currentParameter.values.length);
    // this.endIndices = new Array<number>(this.currentParameter.values.length);
    this.calculateEndReleases = false;
    this.startIndices = [];
    this.endIndices = [];
    this.productService.getReleaseValues(this.currentProduct.id, this.currentParameter.id).subscribe(releaseValues =>
    {
      if (!this.isParameterMappedToProduct())// (releaseValues == null || releaseValues == [] || releaseValues.length == 0)
      {
        this.releaseValues = [];
        this.paramMappedToProduct = false;
        for (let i = 0; i < this.currentParameter.values.length; i++)
        {
          this.startIndices.push(0);
          this.endIndices.push(0);
        }
      }
      else
      {
        this.releaseValues = releaseValues;
        this.paramMappedToProduct = true;
        // console.log("ReleaseValues Loaded " + JSON.stringify(this.releaseValues))
        for (let i = 0; i < this.currentParameter.values.length; i++) 
        {
          let flag = false;
          for (let j = 0; j < this.releaseValues.length && !flag; j++) 
          {
            if (this.releaseValues[j].valueID === this.currentParameter.values[i].id)
            {
              let order1 = this.releaseValues[j].startOrder;
              let order2 = this.releaseValues[j].endOrder;
              let index1;
              let index2;
              if (order1 == Release.naOrder)
              {
                index1 = this.releases.length;
              }
              else 
              {
                index1 = this.findIndexOfReleaseByOrder(order1);
              }
              if (order2 == Release.foreverOrder)
              {
                index2 = 0;
              }
              else if (order2 == Release.naOrder)
              {
                index2 = this.releases.length + 1;
              }
              else 
              {
                index2 = this.findIndexOfReleaseByOrder(order2);
                if (index2 != undefined && index2 >= 0)
                {
                  index2 = index2 + 1;
                }

              }

              this.startIndices.push(index1);
              this.endIndices.push(index2);
              flag = true;
            }
          }
        }
        console.log("Start: " + this.startIndices);
        console.log("End: " + this.endIndices);
        
      }
      this.calculateEndReleases = true;
    })
  }

  private isParameterMappedToProduct(): boolean
  {
    for (let i = 0; i < this.currentProduct.parameters.length; i++)
    {
      if (this.currentProduct.parameters[i].id == this.currentParameter.id)
      {
        return true;
      }
    }
    return false;
  }

  private findIndexOfReleaseByOrder(releaseOrder: number)
  {
    for (let i = 0; i < this.releases.length; i++)
    {
      if (this.releases[i].order_ == releaseOrder)
        return i;

    }
    return -1;
  }


  /**
   * Update the parameter values 
   * @param currentParameter 
   */
  updateParameter(currentParameter: Parameter)
  {
    if (currentParameter != null)
    {
      this.currentParameter = currentParameter;
      if (this.currentProduct != null)
      {
        this.updateReleaseValues();
      }
    }
  }

  /**
   * Update the rows of the table to show the values of the current parameter.
   */
  updateRows()
  {
    if (this.currentParameter != null)
    {
      let values = this.currentParameter.values;
      this.rows.length = 0;
      values.forEach(element =>
      {
        this.rows.push([element.value]);
      });
    }
  }

  changeProduct()
  {
    this.changingProduct = true;
  }


  cancelButton()
  {
    this.dataService.changeParameter(null);
    this.router.navigate(['/dell/config/productReleaseMapping'])
  }

  saveButton()
  {
    console.log(this.startIndices)
    console.log(this.endIndices)
    if (this.releases == undefined || this.releases.length == 0)
    {
      this.alertService.alert("No releases", 2000, false);
      return;
    }
    let newReleaseValues: ReleaseValue[] = [];
    for (let i = 0; i < this.currentParameter.values.length; i++) 
    {
      let startReleaseIndex = this.startIndices[i];
      let endReleaseIndex = this.endIndices[i];

      let relValue;
      let startRelOrder;
      let startRelId;
      let endRelOrder;
      let endRelId;
      if (endReleaseIndex == undefined || endReleaseIndex == -1 || endReleaseIndex == this.releases.length + 1) // Picked last option in end, which is N/A
      {
        endRelId = Release.naId;
        endRelOrder = 0;
      }
      else if (endReleaseIndex == 0)
      {
        endRelId = Release.foreverId;
        endRelOrder = Release.foreverOrder;
      }
      else
      {
        endRelId = this.releases[endReleaseIndex - 1].id;
        endRelOrder = this.releases[endReleaseIndex - 1].order_;
      }
      if (startReleaseIndex == undefined || startReleaseIndex == -1 || startReleaseIndex == this.releases.length) // Picked last option in startReleaseIndex, which is N/A
      {
        startRelId = Release.naId;
        startRelOrder = 0;
      }
      else
      {
        startRelId = this.releases[startReleaseIndex].id;
        startRelOrder = this.releases[startReleaseIndex].order_;
      }
      relValue = new ReleaseValue(this.currentParameter.values[i].id, this.currentProduct.id, startRelOrder, endRelOrder);
      newReleaseValues.push(relValue);
    }
    this.releaseValues = newReleaseValues;
    console.log(JSON.stringify(this.releaseValues));
    let obs = this.productService.updateReleaseValues(this.releaseValues);
    this.alertService.loadingMenu("Saving...", obs, () =>
    {
      this.alertService.alertWithCallback("Saved", 1000, false, () =>
      {
        if (!this.currentProduct.parameters.includes(this.currentParameter))
        {
          this.currentProduct.parameters.push(this.currentParameter);
          this.router.navigate(['/dell/config/productReleaseMapping'])
        }
      }, 'center');
    }, () =>
    {
      this.alertService.alert("Failed", 1000, false, 'center', 'error');
    })
  }

  updateStartReleases(indices: number[])
  {
    this.startIndices = indices;
  }

  updateEndReleases(indices: number[])
  {
    this.endIndices = indices;
  }
}


