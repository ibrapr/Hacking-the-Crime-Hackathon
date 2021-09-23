import { Component, OnInit } from '@angular/core';
import { DateRange } from 'igniteui-angular';
import { DataTable } from 'src/app/dell/models/DataTable';
import { Product } from 'src/app/dell/models/Product';
import { Release } from 'src/app/dell/models/Release';
import { TscFile } from 'src/app/dell/models/TscFile';
import { ActionAlertService } from 'src/app/dell/services/dialogService/action-alert.service';
import { TscGenerateService } from 'src/app/dell/services/TscGenerateService/tsc-generate.service';
import { FileDownloadService } from 'src/app/dell/services/file-download.service'
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-numbine-admin-dashboard',
  templateUrl: './numbine-admin-dashboard.component.html',
  styleUrls: ['./numbine-admin-dashboard.component.scss']
})
export class NumbineAdminDashboardComponent implements OnInit {
  constructor(private router: Router, private filedownload: FileDownloadService, private FileService: TscGenerateService, private actionAlert: ActionAlertService) { }

  public dataTable: DataTable = new DataTable;
  public products: Product[];
  public title = "Products";
  public title1 = "Releases";
  public productSelected: Product;
  public releaseSelected: Release;
  public releaseList: Release[];
  public prFlag: boolean = false;
  cnt: number;
  public titles = ['Date', 'configuration', 'Combination', 'No.Tests', 'Product', 'Release', 'Test Cycle'];
  public rows: any[] = [];
  // public rows: any[] = [['tse','tse','tse','tse','tse','tse','tse','tse','tse',]];
  files: TscFile[] = [];
  dateflag: Boolean = false;
  download: boolean = true;
   searchRelease:TscFile[];

  trash: boolean = true;
  hasActions: boolean = true;
  //  downloadBool:Boolean=true
  //  openBool:Boolean=true;
  hasParameterFileAndFileConfig: boolean = true;

  ngOnInit(): void {
    let obsFiles = this.FileService.viewAllFilesWithoutDate();
    obsFiles.subscribe(data => {
      this.updateRows(data)
    }, (err) => {
      console.log(err)
    });
  }
  private updateRows(data: TscFile[]) {
    this.dataTable = new DataTable();
    this.dataTable.titles = this.titles;
    let truefiles:TscFile[]=[];
    this.rows = [];
    for (let i = 0; i < data.length; i++) {
      this.files[i] = data[i];
      
     
      if(this.files[i].status){
        truefiles.push(this.files[i]);
        let date = formatDate(this.files[i].generationDate,"MM/dd/yyyy",'en');

        this.rows.push([ date, this.files[i].gTR.fileName, this.files[i].gTR.combinations,
          this.files[i].gTR.testsNumber, this.files[i].prodName, this.files[i].relName, this.files[i].testCycle])
      }}
    this.files=truefiles;
    this.dataTable.rows = this.rows;
  }
  public range: DateRange = { start: new Date(new Date().setDate(new Date().getDate() - 7)), end: new Date() };

  selectedRelease(releaseSelected: number) {
    this.releaseSelected = this.releaseList[releaseSelected];
    console.log(this.releaseSelected);
  }
  selectedProduct(productSelected: Product) {
    this.productSelected = productSelected;
    console.log(this.productSelected);
    if (!!this.productSelected) {
      this.releaseList = productSelected.releases;
    } else {
      this.releaseList = [];
    }
  }
  public deleteRow(index: any) {
    this.actionAlert.confirmAlert('You will not be able to recover this file!',
      'Are you sure you want to remove the file ' + this.files[index].gTR.fileName + '?',
      '',
      'File has been deleted',
      'Your imaginary file is safe :)',
      ' File has not been deleted',
      success => {
       console.log(this.files[index].id+"id")
      
        this.FileService.deleteFile(this.files[index].id).subscribe(() => {
          this.files.splice(index,1);
          this.dataTable=new DataTable();
          this.dataTable.rows=this.rows;

          this.dataTable.titles=this.titles;
          this.updateRows(this.files);
        });
      },
      failure => { },"warning"
    )
  }
  excuteFunctions() {
    if (this.range.end >= this.range.start) {
      this.dateflag = false;
      console.log(this.productSelected);
      console.log(this.releaseSelected);
      console.log(!!this.productSelected && !!this.releaseSelected)
      if (!!this.productSelected && !!this.releaseSelected) {
        this.prFlag = false;
        if(!!this.range.end&&!!this.range.start&&!this.dateflag){
          let endD= formatDate(this.range.end,"MM/dd/yyyy",'en');
          let startD= formatDate(this.range.start,"MM/dd/yyyy",'en');
          this.FileService.viewAllFilesAsync(endD,this.productSelected.id,this.releaseSelected.id,startD).subscribe(data=>{
            this.searchRelease=[];
            data.forEach(element=>
              {
                if(element.relName==this.releaseSelected.releaseName)
                this.searchRelease.push(element);
              })
            this.files=this.searchRelease;
            this.updateRows(this.searchRelease);
          })
          
        }

      }
      else {
        this.prFlag = true;

      }
    } else {
      this.dateflag = true;
    }
  }
  downloadFunction(index: any) {
    console.log(this.files[index].gTR.fileName)
    let link = this.filedownload.filedownloadAssync(this.files[Number(index)].gTR.fileName);
    if(link){
      console.log(link.toString());
      window.open(link);
    }
  }
}
