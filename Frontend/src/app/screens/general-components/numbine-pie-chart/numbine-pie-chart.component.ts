import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Input } from '@angular/core';
import { PieChartsData } from '../../models/DataTable';

@Component({
  selector: 'app-numbine-pie-chart',
  templateUrl: './numbine-pie-chart.component.html',
  styleUrls: ['./numbine-pie-chart.component.scss']
})
export class NumbinePieChartComponent implements OnChanges {
  @Input()
  pieChartsData: PieChartsData;
  pie1CAC: any;
  constructor() {
    this.pieChartsData = new PieChartsData;
   }

   ngOnChanges(changes:SimpleChanges){
    this.insertValues(this.pieChartsData);
  }

  insertValues(pieChartsData1 : PieChartsData) {
    this.init();
    this.pie1CAC.series = pieChartsData1.data;
    this.pie1CAC.labels = pieChartsData1.label;
  }

  init() {
    this.pie1CAC = {
      chart: {
        height: 320,
        type: 'pie',
      },
      labels: [],
      series: [],
      colors: ['#1abc9c', '#0e9e4a', '#ff5252'],
      legend: {
        show: true,
        position: 'bottom',
      },
      dataLabels: {
        enabled: true,
        dropShadow: {
          enabled: false,
        }
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    };
  }
}
