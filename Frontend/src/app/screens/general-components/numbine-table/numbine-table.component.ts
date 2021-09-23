import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { PlotHeatmapDataLabelsOptions } from 'highcharts';

@Component({
  selector: 'app-numbine-table',
  templateUrl: './numbine-table.component.html',
  styleUrls: ['./numbine-table.component.scss']
})
export class NumbineTableComponent implements OnInit {

  @Input()
  dataTable: DataTable = new DataTable();
  constructor() {
  }
  ngOnInit(): void {
  }
}
class DataTable {
  public titles: string[]
  public rows: any[][]
}