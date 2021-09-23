import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {NumbineChartData} from 'src/app/app/fack-db/numbine-chart-data';

@Component({
  selector: 'app-numbine-charts',
  templateUrl: './numbine-charts.component.html',
  styleUrls: ['./numbine-charts.component.scss']
})
export class NumbineChartsComponent implements OnInit {

  @Input()
  public type = "pie";

  constructor() {
    this.numbineChartData = NumbineChartData;  
  }
  public numbineChartData: any;
  ngOnInit(): void {
  }

}
