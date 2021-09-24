import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataTable } from '../../models/DataTable';
import { Report } from '../../models/Report'
import { DataService } from '../../services/DataService/data.service';
import { ActionAlertService } from '../../services/dialogService/action-alert.service';
import { ReportServiceService } from '../../services/report-service.service';

@Component({
  selector: 'app-school-table',
  templateUrl: './school-table.component.html',
  styleUrls: ['./school-table.component.scss']
})
export class SchoolTableComponent implements OnInit {
  trash: Boolean = true;
  edit: Boolean = true;
  reports: Report[] = [];
  loading = false;
  index = 0;
  public titles = ['Name','Class','Status'];
  public rows: any = [];
  dataTable = new DataTable()
  currentReport: Report;
  reportSubscription: Subscription;
  statusString:String;

  constructor(private dataService: DataService,private actionAlert: ActionAlertService
    , private router: Router,private reportService:ReportServiceService) { }

  ngOnInit(): void {
    this.dataService.changeReport(null);
    this.dataTable = new DataTable();
    this.dataTable.rows = this.rows;
    this.dataTable.titles = this.titles;
    
    let obsProducts = this.reportService.getAllreports();
    obsProducts.subscribe(data => {
      this.reports = data;
      this.dataTable = new DataTable();
      this.dataTable.rows = this.rows;
      this.dataTable.titles = this.titles;
      // Add loading?
      this.updateRows();
    }, error => {

    });
  }
  updateRows() {
    console.log(this.reports)
    this.rows.length = 0;
    this.reports.forEach(element => {
      
      this.rows.push([element.subject, element.content, element.status]);
    });
    this.dataTable = new DataTable();
    this.dataTable.rows = this.rows;
    this.dataTable.titles = this.titles;
  }
  deleteRow(index: number) {
    this.index = index;
    this.actionAlert.alert(this.reports[index].content, 2500, null, '', '');
  }
  updateFunction(index: number) {
    this.dataService.changeReport(this.reports[index]);
    this.router.navigate(['/dell/config/editExplanation', { update: 'true' }]);
  }



}
