import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Product } from 'src/app/dell/models/Product'
import { ButtonClass } from 'src/app/demo/enums/myenum.enum';
import { DataTable } from '../../models/DataTable';
import { Parameter } from '../../models/Parameter';
import { Release } from '../../models/Release';
import { TscFile } from '../../models/TscFile';
import { User } from '../../models/User';
import { Value } from '../../models/Value';
import { DataService } from '../../services/DataService/data.service';
import { ActionAlertService } from '../../services/dialogService/action-alert.service';
import { LogInServiceService } from '../../services/LogInService/log-in-service.service';
import { ParameterService } from '../../services/ParameterService/parameter.service';
import { ProductService } from '../../services/ProductService/product.service';
import { TscGenerateService } from '../../services/TscGenerateService/tsc-generate.service';

import { __await } from 'tslib';
import { WebServiseService } from '../../services/WebService/web-service.service';
import { GeneratedTestReport } from '../../models/GeneratedTestReport';
import { FileDownloadService } from '../../services/file-download.service';
@Component({
  selector: 'app-user-config-generator-page',
  templateUrl: './user-config-generator-page.component.html',
  styleUrls: ['./user-config-generator-page.component.scss']
})



export class UserConfigGeneratorPageComponent implements OnInit
{
  public productList: Product[] = [];
  public paramsList: Parameter[] = [];
  public valueList: Value[] = [];
  public valueListString: string[] = [];
  public valueListName: string;
  public releaseList: Release[];
  public numberList: String[];
  public productSelected: Product;
  public releaseSelected: Release;
  public selectedTuple: string = "test";
  public Flag: boolean = false;
  public title = ['Parameter Name', 'Value'];
  public rows = [];
  public dataTable = new DataTable();
  edit: Boolean = true;
  public editing: boolean = false;
  public index: number = 0;
  public loading: boolean = false;
  buttonClass = ButtonClass;
  currentProduct: Product;
  currentParameter: Parameter;
  public gtr: GeneratedTestReport;
  public testCycle: string;
  public groupName: string;
  public genLoading: boolean = false;
  variable: Product = null;
  public selectedflag: boolean = true;
  public testCycleDescription: string;
  public currentTC: number;
  public generatedflag: boolean = false;
  public datatable2: DataTable = new DataTable();
  public title2 = ['Combinations', 'Tests number'];
  public rows2 = [];




  constructor(private filedownload: FileDownloadService, private webService: WebServiseService, private actionAlert: ActionAlertService, private productService: ProductService, private paramService: ParameterService, private dataService: DataService, private tscGenerateService: TscGenerateService, private logInService: LogInServiceService)
  {

    this.updateFunction = this.updateFunction.bind(this);
    this.loading = false;
  }

  ngOnInit(): void
  {

    let obsProducts = this.productService.getAllProducts();
    obsProducts.subscribe(products =>
    {
      this.productList = products;
      // Add loading?
    }, error =>
    {
      this.actionAlert.alert("Error in loading products, product-release-mapping.component.ts", 3000, true, 'center', "error");
    });

    // Initialize Table
    this.dataTable.rows = this.rows;
    this.dataTable.titles = this.title;
  }


  selectedRelease(releaseSelected: number)
  {

    if (releaseSelected != null)
    {
      this.releaseSelected = this.releaseList[releaseSelected];
      // Subscribe the selectedProduct to the value saved in the Data Service
      this.updateParams();
      // Subscribe the currentParameter to the value saved in the Data Service
    }
    else
    {
      this.selectedflag = true;
    }
    console.log(releaseSelected);
  }


  updateTuple(newTuple: string)
  {
    this.selectedTuple = newTuple;
    console.log(newTuple);

  }

  updateFunction(index: number)
  {
    // TODO:
    // This only saves the parameter to update... need to route to the new param mapping page to edit it
    this.index = index;
    console.log(this.index);
    this.dataService.changeParameter(this.paramsList[index]);
    this.editing = !this.editing;


  }


  /**
   * Select a new product
   * @param newProduct New product to select
   */
  updateSelectedProduct(newProduct: Product)
  {
    this.currentProduct = newProduct;
    if (newProduct.releases.length == 0)
    {
      this.actionAlert.alert("this product has no releases", 3500, false, 'center', 'warning')
      this.selectedflag = true;
    }
    else
    {
      this.releaseList = newProduct.releases;
      this.valueListString = []
      console.log(this.valueListString + "hi");
      this.selectedflag = false;
    }
  }

  /**
   * Update the parameter list based on the currently selected product
   */
  updateParams()
  {
    setTimeout(() =>
    {
      if (this.currentProduct != null)
      {
        let obsParams = this.paramService.getAllParametersByProductId(this.currentProduct.id)//specific params for release

        this.loading = true;
        obsParams.subscribe(params =>
        {
          this.paramsList = params;
          this.updateRows();
          this.loading = false;
          // Add loading?
        }, error =>
        {
          this.loading = false;
          this.actionAlert.alert("Error in loading params, product-release-mapping.component.ts " + error, 3000, true, 'center', "error");
        });
      }
    }, 0); /// time out for testing the loading code

  }

  /**
   * Update the rows in the table
   */
  updateRows()
  {
    this.rows.length = 0;
    let map = new Map<string, any>();
    map.set("productId", this.currentProduct.id);
    map.set("releaseId", this.releaseSelected.id);
    this.webService.get<Value[]>("ReleaseValues/getAllValuesOfProductRelease", map).subscribe(values =>
    {
      let vMap = new Map<number, string[]>();
      for (let i = 0; i < values.length; i++)
      {
        if (vMap.has(values[i].paramId))
        {
          let pvalues = vMap.get(values[i].paramId);
          pvalues.push(values[i].value);
          vMap.set(values[i].paramId, pvalues);

        }
        else
        {
          let pvalues: string[] = [];
          pvalues.push(values[i].value);
          vMap.set(values[i].paramId, pvalues);
        }

      }
      let ids: number[] = [];
      vMap.forEach((val, key) =>
      {
        ids.push(key);
      });

      console.log(values);
      this.paramService.getAllParametersByIdsAsync(ids).subscribe(parameters =>
      {
        this.paramsList = parameters;
        this.dataTable = new DataTable();
        this.dataTable.rows = this.rows;
        this.dataTable.titles = this.title;

        vMap.forEach((val, key) =>
        {


          this.valueListString.push(val.toString() + ",");
          let lastString = this.valueListString[this.valueListString.length - 1];
          this.valueListString[this.valueListString.length - 1] = this.valueListString[this.valueListString.length - 1].substring(0, lastString.length - 1);

          this.rows.push([this.getParameterNameById(key, parameters), val.toString()]);

        });


      }, err => { console.log(err) });


    }, err => { console.log(err) });

  }
  getParameterNameById(key: number, parameters: Parameter[]): string
  {
    for (let i = 0; i < parameters.length; i++)
    {
      if (parameters[i].id == key)
      {
        return parameters[i].parameterName;
      }
    }
    return "NONE";
  }
  //     this.paramsList.forEach(element =>
  //     { this.valueListName="";
  //       for (let i = 0; i <element.values.length ; i++){
  //         try{
  //           console.log(element.parameterName+this.valueListName)
  //       this.valueList[i]=values[i];}
  //       catch(err){
  //         this.actionAlert.alert("something went wrong getting values",3000,true,'center','error');
  //       }
  //       if(i==0){
  //       this.valueListName=this.valueListName+this.valueList[i].value;}
  //       else{

  // this.valueListName=this.valueListName+","+this.valueList[i].value;}
  //    }
  //    console.log(element.parameterName+this.valueListName)
  //    this.rows.push([element.parameterName,this.valueListName]);
  //    this.valueListString.push(this.valueListName);
  //    },err=>{console.log(err)});



  //     });
  //   }


  // /////////////////////////////

  public generateTsc()
  {
    if(!this.selectedRelease||!this.productSelected||!this.selectedTuple||(!this.testCycle||!this.testCycleDescription)){
      this.actionAlert.alert("missing input",3000,true,'center','warning');
    }
    let i = 0;
    let paramListNew: string = '';
    let valuesI: string[] = [];
    this.paramsList.forEach(element =>
    {
      paramListNew = paramListNew + element.parameterName + ": " + this.valueListString[i++] + "\n"


    }


    );
    console.log(paramListNew);


    let usr: User = this.logInService.usr;

    //usr=new User(1,"test","test@gmail.com","123pass");
    console.log(this.currentProduct.productName);
    this.genLoading = true;
    this.tscGenerateService.generateTscFileAsync(usr.id, this.currentProduct.id, this.releaseSelected.id, this.testCycle, paramListNew, this.selectedTuple).subscribe(gtr =>
    {
      this.genLoading = false;
      if (!!gtr)
      {
        this.actionAlert.alert("success", 3000, false, 'center', 'success');
        this.gtr = gtr;
        ///// show report table
        this.rows2.length = 0;
        this.rows2.push([this.gtr.combinations.toString(), this.gtr.testsNumber.toString()])
        this.datatable2.rows = this.rows2
        this.datatable2.titles = this.title2
        this.generatedflag = true;
      }
      console.log(this.gtr);
      //set  path returned from PICT!!


    }, err =>
    {
      this.genLoading = false;

      //alert("Error" + err);
      this.actionAlert.alert("Error" + err, 3000, true, 'center', 'error');
    });



  }

  public updateEditedRows(event: any)
  {


    let i = 0;
    this.rows.length = 0;
    this.dataTable = new DataTable();
    this.dataTable.rows = this.rows;
    this.dataTable.titles = this.title;
    this.paramsList.forEach(element =>
    {
      this.rows.pop;
      this.rows.push([element.parameterName, this.valueListString[i++]]);

    });

  }
  downloadFunction()
  {
    let names = this.gtr.inputFilePath.split("/");
    let name = names[names.length - 1];
    let link = this.filedownload.filedownloadAssync(name);
    if (link)
    {
      console.log(link.toString());
      window.open(link);
    }
  }

}