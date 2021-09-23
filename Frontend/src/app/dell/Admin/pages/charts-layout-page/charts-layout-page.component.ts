import { Component, OnChanges, OnInit } from '@angular/core';
import { DateRange } from 'igniteui-angular';
import { Product } from '../../../models/Product';

import { LineChartsData, PieChartsData, BarChartsData } from './../../../models/DataTable';
import { ProductService } from '../../../services/ProductService/product.service';
import { Release } from '../../../models/Release';
import { ReportResult } from 'src/app/dell/models/ReportResult';
import { ReportResultService } from '../../../services/ReportResult/report-results.service'
import { Parameter } from '../../../models/Parameter';
import { Subscription } from 'rxjs';
import { DataService } from '../../../services/DataService/data.service';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-charts-layout-page',
  templateUrl: './charts-layout-page.component.html',
  styleUrls: ['./charts-layout-page.component.scss']
})
export class ChartsLayoutPageComponent implements OnInit {

  public products: Product[];
  public title = "Products";
  public title1 = "Releases";
  public rows = [];
  public flag = false;
  public barflag = false;
  public dateflag = false;
  public resultflag = false;

  public linedataTable;
  public piedataTable;
  public bardataTable;

  public productSelected: Product;
  public releaseSelected: Release;
  public releaseList: Release[];
  public productList: Product[] = [];
  public Flag: boolean = false;
  public params: Parameter[] = [];

  public selectedTuple: String;

  downloadBool: Boolean = true;
  currentProduct: Product;

  public values: any;
  public valuesbar: any;
  public dateStringArray: string[] = [];
  public currentDate;

  public resultDataPie: ReportResult;
  public resultData3months: ReportResult;
  public resultNewData: ReportResult;

  productSubscription: Subscription;


  public range: DateRange = { start: new Date(new Date().setDate(new Date().getDate() - 90)), end: new Date() };

  constructor(private resultReportService: ReportResultService, private productService: ProductService, private dataService: DataService) {
  }
  async ngOnInit() {
    this.dateRangeIntoWeeks();
    this.dataService.changeProduct(null);
    this.dataService.changeRelease(null);
    this.productSubscription = this.dataService.currentProduct.subscribe(currentProduct => {
      this.currentProduct = currentProduct;
      this.updateReleases(currentProduct);
    });
    let obsProducts = this.productService.getAllProducts();
    obsProducts.subscribe(products => {
      this.productList = products;
      // Add loading?
    }, error => {
      alert("Error in loading products, product-release-mapping.component.ts");
    });
    this.startObs();
  }

  startObs() {
    let obsResultReportPie = this.resultReportService.getRolesTypeStatisics();
    obsResultReportPie.subscribe(ResultData => {
      this.resultDataPie = ResultData;
      this.startPieChart();
    }), error => {
      alert(" Error in Loading Pie Chart Results");
    }
    this.obsForWantedDates();
    this.firstBarChart(this.dateStringArray);
  }

  obsForWantedDates(){
    var sd = formatDate(this.range.start, 'yyyy/MM/dd', 'en');
    var ed = formatDate(this.range.end, 'yyyy/MM/dd', 'en');
    let obsResultReport3months = this.resultReportService.getUserFilesCreated(sd, ed);
    obsResultReport3months.subscribe(ResultData => {
      this.resultData3months = ResultData;
      this.startLineChart(ResultData);
    }), error => {
      alert(" Error in Loading Pie Chart Results");
    }
  }

  obsForWantedProduct(pid: number, rid: number) {
    var sd = formatDate(this.range.start, 'yyyy/MM/dd', 'en');
    var ed = formatDate(this.range.end, 'yyyy/MM/dd', 'en');
    let obsResultReportNewData = this.resultReportService.getUserFilesCreatedForProduct(pid, rid, sd, ed);
    obsResultReportNewData.subscribe(ResultData => {
      this.resultNewData = ResultData;
      this.startBarChart(ResultData);
    }), error => {
      alert("Error in Loading Pie Chart Results");
    }
  }

  dateRangeIntoWeeks() {
    this.currentDate = new Date(this.range.start);
    this.dateStringArray = [];
    let formattedDt = formatDate(this.currentDate, 'MM-dd-yyyy', 'en_US');
    this.dateStringArray.push(formattedDt);
    while (this.currentDate < this.range.end) {
      formattedDt = formatDate(new Date(this.currentDate.setDate(this.currentDate.getDate() + 7)), 'MM-dd-yyyy', 'en_US')
      if (this.currentDate > this.range.end) {
        formattedDt = formatDate(this.range.end, 'MM-dd-yyyy', 'en_US')
        this.dateStringArray.push(formattedDt);
        break;
      }
      this.dateStringArray.push(formattedDt);
    }
  }

  startPieChart() {
    this.piedataTable = new PieChartsData();
    for (var i = 0; i < this.resultDataPie.xValues.length; i++) {
      this.piedataTable.label.push(this.resultDataPie.xValues[i]);
    }
    for (var i = 0; i < this.resultDataPie.yValues.length; i++) {
      this.piedataTable.data.push(this.resultDataPie.yValues[i]);
    }
  }

  startLineChart(R: ReportResult) {
    this.linedataTable = new LineChartsData();
    this.values = [];
    if (!!!R.yValues[0]) {
      this.flag=true;
      for (var i = 0; i < this.dateStringArray.length; i++) {
        this.values.push(0);
      }
      this.linedataTable.data = this.values;
      this.linedataTable.name = "USER Activity";
      this.linedataTable.titleText = "USER Activity";
      this.linedataTable.xaxisCatagories = this.dateStringArray;
    }
    else {
      this.flag = false;
      var date = 0;
      for (var i1 = 1; i1 < this.dateStringArray.length; i1++) {
        var splitted = this.dateStringArray[date].split("-");
        var splitted1 = this.dateStringArray[i1].split("-");
        date = date + 1;
        var m = Number(splitted[0]);
        var d = Number(splitted[1]);
        var y = Number(splitted[2]);
        var mm = Number(splitted1[0]);
        var dd = Number(splitted1[1]);
        var yy = Number(splitted1[2]);
        var counter = 0;
        for (var i = 0; i < R.xValues.length; i++) {
          var split = R.xValues[i].split("-");
          var month = Number(split[0]);
          var day = Number(split[1]);
          var year = Number(split[2]);
          var b = new Date(year, month, day);
          var start = new Date(y, m, d);
          var end = new Date(yy, mm, dd);
          if (b >= start && b < end) {
            counter = counter + R.yValues[i];
          }
        }
        this.values.push(counter);
      }
      this.values.push(0);
      this.linedataTable.data = this.values;
      this.linedataTable.name = "USER Activity";
      this.linedataTable.titleText = "USER Activity";
      this.linedataTable.xaxisCatagories = this.dateStringArray;
    }
  }

  firstBarChart(str:string[]){
    this.bardataTable = new BarChartsData();
    this.barflag=true;
    this.bardataTable.name = "Files Created By User";
    this.bardataTable.titleText = "Files Created By User";
    this.bardataTable.xaxisCatagories = str;
  }

  startBarChart(R: ReportResult) {
    this.bardataTable = new BarChartsData();
    this.valuesbar = [];
    if (!!!R.yValues[0]) {
      this.resultflag = true;
      for (var i = 0; i < this.dateStringArray.length; i++) {
        this.valuesbar.push(0);
      }
      this.bardataTable.data = this.valuesbar;
      this.bardataTable.name = "Files Created By User";
      this.bardataTable.titleText = "Files Created By User";
      this.bardataTable.xaxisCatagories = this.dateStringArray;
    }
    else {
      var date = 0;
      this.barflag = false;
      this.resultflag = false;
      for (var i1 = 1; i1 < this.dateStringArray.length; i1++) {
        var splitted = this.dateStringArray[date].split("-");
        var splitted1 = this.dateStringArray[i1].split("-");
        date = date + 1;
        var m = Number(splitted[0]);
        var d = Number(splitted[1]);
        var y = Number(splitted[2]);
        var mm = Number(splitted1[0]);
        var dd = Number(splitted1[1]);
        var yy = Number(splitted1[2]);
        var counter = 0;
        for (var i = 0; i < R.xValues.length; i++) {
          var split = R.xValues[i].split("-");
          var month = Number(split[0]);
          var day = Number(split[1]);
          var year = Number(split[2]);
          var b = new Date(year, month, day);
          var start = new Date(y, m, d);
          var end = new Date(yy, mm, dd);
          if (b >= start && b < end) {
            counter = counter + R.yValues[i];
          }
        }
        this.valuesbar.push(counter);
      }
      this.valuesbar.push(0);
      this.bardataTable.data = this.valuesbar;
      this.bardataTable.name = "Files Created By User";
      this.bardataTable.titleText = "Files Created By User";
      this.bardataTable.xaxisCatagories = this.dateStringArray;
    }
  }

  updateReleases(currentProduct: Product) {
    if (!!currentProduct) {
      this.Flag = true;
      this.releaseList = currentProduct.releases;
      // Add loading?
    }
  }

  selectedRelease(index: number) {
    this.releaseSelected = this.releaseList[index];
  }

  selectedProduct(productSelected: Product) {
    this.productSelected = productSelected;
    if(!!this.productSelected){
      this.releaseList = productSelected.releases;
    }else{
      this.releaseList=[];
    }
  }

  updateTuple(selectedTuple: string) {
    this.selectedTuple = selectedTuple;
  }

  excuteFunctions() {
    this.dateRangeIntoWeeks();
    if (this.range.end > this.range.start) {
      this.dateflag = false;
      this.resultflag = false;
      this.obsForWantedDates();
      if (!!!this.productSelected) {
        this.startObs();
        this.firstBarChart(this.dateStringArray);
      } else if (!!!this.releaseSelected) {
        this.barflag=false;
        this.obsForWantedProduct(this.productSelected.id, -1);
      } else {
        this.barflag=false;
        this.obsForWantedProduct(this.productSelected.id, this.releaseSelected.id);
      }
    } else {
      this.flag=false;
      this.barflag=false;
      this.dateflag = true;
    }
  }

}
