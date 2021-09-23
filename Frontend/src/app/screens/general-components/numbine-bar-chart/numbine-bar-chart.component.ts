import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BarChartsData } from '../../models/DataTable';

@Component({
  selector: 'app-numbine-bar-chart',
  templateUrl: './numbine-bar-chart.component.html',
  styleUrls: ['./numbine-bar-chart.component.scss']
})
export class NumbineBarChartComponent implements OnChanges {
  @Input()
  barChartData: BarChartsData;
  bar2CAC: any;
  constructor() {
    this.barChartData = new BarChartsData;
  }

  ngOnChanges(changes:SimpleChanges){
    this.insertValues(this.barChartData);
  }

  insertValues(barChartData1 : BarChartsData){
    this.init();
    this.bar2CAC.series.pop()
    this.bar2CAC.series.push({ name: barChartData1.name, data: barChartData1.data });
    this.bar2CAC.title.text = barChartData1.titleText;
    this.bar2CAC.xaxis.categories = barChartData1.xaxisCatagories;
  }

  init() {
    this.bar2CAC = {
      chart: {
        height: 300,
        type: 'bar',
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: false
      },
      colors: ['#1abc9c', '#0e9e4a', '#ffa21d', '#ff5252'],
      title: {
        text: 'user',
        align: 'left'
      },
      responsive: [{
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0
          }
        }
      }],
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      series: [{
        data: [],
        name: ''
      }],
      xaxis: {
        type: 'string',
        categories: [],
      },
      legend: {
        position: 'right',
        offsetY: 40
      },
      fill: {
        opacity: 1
      },
    };
  }
}
