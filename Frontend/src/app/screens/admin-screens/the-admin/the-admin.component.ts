import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataTable } from '../../models/DataTable';
import { Report } from '../../models/Report';
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

  
  public title = ['Subject','Status'];
  public rows = [];
  public dataTable = new DataTable();

  constructor( private router: Router,private reportService: ReportServiceService ) { }

  ngOnInit(): void {
    this.dataTable.rows = this.rows;
    this.dataTable.titles = this.title;
    this.dataTable.rows = this.rows;
    this.dataTable.titles = this.title;
    let obsRelease = this.reportService.getAllreports();
    obsRelease.subscribe(report=>{
      this.reports=report;
      this.dataTable = new DataTable();
      this.dataTable.rows = this.rows;
      this.dataTable.titles = this.title;
      this.updateRows();

    }, error => {

    });
  }
 updateRows() {
    this.rows.length = 0;
    this.reports.forEach(report => {
        this.rows.push([report.subject,report.status]);
    });
  }


}
