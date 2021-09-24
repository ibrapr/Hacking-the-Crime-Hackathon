import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataTable } from '../../models/DataTable';
import { Report } from '../../models/Report';
import { DataService } from '../../services/DataService/data.service';
import { ActionAlertService } from '../../services/dialogService/action-alert.service';
import { ReportServiceService } from '../../services/report-service.service';

@Component({
  selector: 'app-the-admin',
  templateUrl: './the-admin.component.html',
  styleUrls: ['./the-admin.component.scss']
})
export class TheAdminComponent implements OnInit {
  trash: Boolean = true;
  edit: Boolean = true;
  public reports: Report[] = [];


  public title = ['Name', 'Class', 'Status'];
  public rows = [];
  public dataTable = new DataTable();
  public index: number;
  constructor(private dataService: DataService, private router: Router, private reportService: ReportServiceService, private actionAlert: ActionAlertService) { }

  ngOnInit(): void {
    this.dataTable.rows = this.rows;
    this.dataTable.titles = this.title;
    this.dataTable.rows = this.rows;
    this.dataTable.titles = this.title;
    let obsRelease = this.reportService.getAllreports();
    obsRelease.subscribe(report => {
      this.reports = report;
      this.dataTable = new DataTable();
      this.dataTable.rows = this.rows;
      this.dataTable.titles = this.title;
      this.updateRows();

    }, error => {

    });
  }
  updateRows() {
    let obsRelease = this.reportService.getAllreports();
    obsRelease.subscribe(report => {
      this.reports = report;
    }, error => {
    });
    this.rows.length = 0;
    this.reports.forEach(report => {
      this.rows.push([report.subject, report.content, report.status]);
    });
  }
  deleteRow(index: number) {
    this.index = index;
    this.actionAlert.alert("Explaination: " + this.reports[index].explanation, 100000, null, '', '');
  }
  updateFunction(index: number) {
    this.reportService.updateStatus(!this.reports[index].status, this.reports[index].id).subscribe((bool) => {
      this.actionAlert.alert("The status has been changed successfully!", 2500, bool, 'center');
      this.reports[index].status = !this.reports[index].status;
    });
    this.updateRows();
  }

}
