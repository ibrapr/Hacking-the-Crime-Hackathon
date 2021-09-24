import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataTable } from '../../models/DataTable';

@Component({
  selector: 'app-the-admin',
  templateUrl: './the-admin.component.html',
  styleUrls: ['./the-admin.component.scss']
})
export class TheAdminComponent implements OnInit {
  trash: Boolean = false;
  edit: Boolean = true;
  public title = ['Release','Product Name', 'Version', 'Status'];
  public rows = [["Temp"], ["Temp"]];
  public dataTable = new DataTable();

  constructor( private router: Router) { }

  ngOnInit(): void {
    this.dataTable.rows = this.rows;
    this.dataTable.titles = this.title;
  }

}
