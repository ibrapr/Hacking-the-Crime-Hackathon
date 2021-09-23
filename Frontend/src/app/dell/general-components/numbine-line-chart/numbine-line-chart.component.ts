import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { LineChartsData } from '../../models/DataTable';


@Component({
  selector: 'app-numbine-line-chart',
  templateUrl: './numbine-line-chart.component.html',
  styleUrls: ['./numbine-line-chart.component.scss']
})
export class NumbineLineChartComponent implements OnChanges{
  @Input()
  lineChartsData2: LineChartsData;
  line3CAC : any;
  constructor() {
    this.lineChartsData2 = new LineChartsData();
  }

  ngOnChanges(changes: SimpleChanges){
    this.insertValues(this.lineChartsData2);
  }

  insertValues(lineChartsData1: LineChartsData){
    this.init();
    this.line3CAC.series.pop();
    this.line3CAC.series.push({ name: lineChartsData1.name, data: lineChartsData1.data});
    this.line3CAC.title.text = lineChartsData1.titleText;
    this.line3CAC.xaxis = {categories: lineChartsData1.xaxisCatagories};

  }
  public init()
  {
    this.line3CAC = {
      chart: {
        height: 300,
        type: 'line',
        zoom: {
          enabled: false
        },
      },
      series: [
        {
          data: [],
          name: ''
        }
      ],
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: [5, 7, 5],
        curve: 'straight',
        dashArray: [0, 8, 5]
      },
      colors: ['#0e9e4a', '#ffa21d', '#ff5252'],
      title: {
        text: 'user',
        align: 'left'
      },
      markers: {
        size: 0,
  
        hover: {
          sizeOffset: 6
        }
      },
      xaxis: {
        categories: [],
      },
      tooltip: {
        y: [{
          title: {
            formatter: (val) => val + ' (mins)'
          }
        }, {
          title: {
            formatter: (val) => val + ' per session'
          }
        }, {
          title: {
            formatter: (val) => val
          }
        }]
      },
      grid: {
        borderColor: '#f1f1f1',
      }
    };
  }
  

}
