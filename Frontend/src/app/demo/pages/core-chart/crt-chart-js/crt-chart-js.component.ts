import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-crt-chart-js',
  templateUrl: './crt-chart-js.component.html',
  styleUrls: ['./crt-chart-js.component.scss']
})
export class CrtChartJsComponent implements OnInit {
  public barBasicChartData: any;
  public barBasicChartOption: any;
  @ViewChild('barBasicChart') barBasicChart: ElementRef; // used barStackedChart, barHorizontalChart
  public barBasicChartTag: CanvasRenderingContext2D;

  public barBasicStackChartData: any;
  public barStackedChartOption: any;
  @ViewChild('barStackedChart') barStackedChart: ElementRef; // used barStackedChart, barHorizontalChart
  public barBasicStackChartTag: CanvasRenderingContext2D;

  public lineIPMChartData: any;
  public lineIPMChartOption: any;
  @ViewChild('lineIPMChart') lineIPMChart: ElementRef;
  public lineIPMChartTag: CanvasRenderingContext2D;

  public areaBasicChartData: any;
  public areaBasicChartOption: any;
  @ViewChild('areaBasicChart') areaBasicChart: ElementRef;
  public areaBasicChartTag: CanvasRenderingContext2D;

  public areaFillOriginChartData: any;
  @ViewChild('areaFillOriginChart') areaFillOriginChart: ElementRef;
  public areaFillOriginChartTag: CanvasRenderingContext2D;

  public areaFillEndChartData: any;
  @ViewChild('areaFillEndChart') areaFillEndChart: ElementRef;
  public areaFillEndChartTag: CanvasRenderingContext2D;

  public areaRadar1ChartData: any;
  @ViewChild('areaRadar1Chart') areaRadar1Chart: ElementRef;
  public areaRadar1ChartTag: CanvasRenderingContext2D;

  public areaRadar2ChartData: any;
  @ViewChild('areaRadar2Chart') areaRadar2Chart: ElementRef;
  public areaRadar2ChartTag: CanvasRenderingContext2D;

  public areaRadar3ChartData: any;
  @ViewChild('areaRadar3Chart') areaRadar3Chart: ElementRef;
  public areaRadar3ChartTag: CanvasRenderingContext2D;

  public pieChartData: any;
  @ViewChild('pieChart') pieChart: ElementRef; // doughnut
  public pieChartTag: CanvasRenderingContext2D;

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      /* bar basic chart */
      const barBasicTag = (((this.barBasicChart.nativeElement as HTMLCanvasElement).children));
      this.barBasicChartTag = ((barBasicTag['bar_basic_chart']).lastChild).getContext('2d');
      // used bar_stacked_chart, bar_horizontal_chart
      const abc = (this.barBasicChartTag).createLinearGradient(0, 300, 0, 0);
      abc.addColorStop(0, '#1abc9c');
      abc.addColorStop(1, '#1abc9c');
      const def = (this.barBasicChartTag).createLinearGradient(0, 300, 0, 0);
      def.addColorStop(0, '#0e9e4a');
      def.addColorStop(1, '#0e9e4a');

      this.barBasicChartData = {
        labels: [0, 1, 2, 3],
        datasets: [{
          label: 'Data 1',
          data: [25, 45, 74, 85],
          borderColor: abc,
          backgroundColor: abc,
          hoverborderColor: abc,
          hoverBackgroundColor: abc,
        }, {
          label: 'Data 2',
          data: [30, 52, 65, 65],
          borderColor: def,
          backgroundColor: def,
          hoverborderColor: def,
          hoverBackgroundColor: def,
        }]
      };

      this.barBasicChartOption = {
        barValueSpacing: 20
      };

      const barBasicStackTag = (((this.barStackedChart.nativeElement as HTMLCanvasElement).children));
      this.barBasicStackChartTag = ((barBasicStackTag['bar_stacked_chart']).lastChild).getContext('2d');
      // used bar_stacked_chart, bar_horizontal_chart
      const abcd = (this.barBasicStackChartTag).createLinearGradient(0, 300, 0, 0);
      abcd.addColorStop(0, '#1abc9c');
      abcd.addColorStop(1, '#1abc9c');
      const defg = (this.barBasicStackChartTag).createLinearGradient(0, 300, 0, 0);
      defg.addColorStop(0, '#f1c40f');
      defg.addColorStop(1, '#f1c40f');

      this.barBasicStackChartData = {
        labels: [0, 1, 2, 3],
        datasets: [{
          label: 'Data 1',
          data: [25, 45, 74, 85],
          borderColor: abcd,
          backgroundColor: abcd,
          hoverborderColor: abcd,
          hoverBackgroundColor: abcd,
        }, {
          label: 'Data 2',
          data: [30, 52, 65, 65],
          borderColor: defg,
          backgroundColor: defg,
          hoverborderColor: defg,
          hoverBackgroundColor: defg,
        }]
      };

      /* bar stacked chart */
      this.barStackedChartOption = {
        barValueSpacing: 20,
        scales: {
          xAxes: [{
            stacked: true,
          }],
          yAxes: [{
            stacked: true
          }]
        }
      };

      /* line interpolation mode chart */
      const lineIpmTag = (((this.lineIPMChart.nativeElement as HTMLCanvasElement).children));
      this.lineIPMChartTag = ((lineIpmTag['line_ipm_chart']).lastChild).getContext('2d');
      const klm = (this.lineIPMChartTag).createLinearGradient(0, 0, 500, 0);
      klm.addColorStop(0, '#0e9e4a');
      klm.addColorStop(1, '#0e9e4a');
      const hij = (this.lineIPMChartTag).createLinearGradient(0, 0, 500, 0);
      hij.addColorStop(0, '#1abc9c');
      hij.addColorStop(1, '#1abc9c');

      this.lineIPMChartData = {
        labels: [0, 1, 2, 3, 4, 5, 6],
        datasets: [{
          label: 'D1',
          data: [55, 70, 62, 81, 56, 70, 90],
          fill: false,
          borderWidth: 4,
          lineTension: 0,
          borderDash: [15, 10],
          borderColor: klm,
          backgroundColor: klm,
          hoverborderColor: klm,
          hoverBackgroundColor: klm,
        }, {
          label: 'D2',
          data: [85, 55, 70, 50, 75, 45, 60],
          fill: true,
          cubicInterpolationMode: 'monotone',
          borderWidth: 0,
          borderColor: hij,
          backgroundColor: hij,
          hoverborderColor: hij,
          hoverBackgroundColor: hij,
        }, {
          label: 'D3',
          data: [50, 75, 80, 70, 85, 80, 70],
          fill: false,
          borderWidth: 4,
          borderColor: '#2ecc71',
          backgroundColor: '#2ecc71',
          hoverborderColor: '#2ecc71',
          hoverBackgroundColor: '#2ecc71',
        }]
      };

      this.lineIPMChartOption = {
        barValueSpacing: 20
      };

      /* area basic chart */
      const areaBasicTag = (((this.areaBasicChart.nativeElement as HTMLCanvasElement).children));
      this.areaBasicChartTag = ((areaBasicTag['area_basic_chart']).lastChild).getContext('2d');
      const bcd = (this.areaBasicChartTag).createLinearGradient(0, 0, 500, 0);
      bcd.addColorStop(0, '#1abc9c');
      bcd.addColorStop(1, '#1abc9c');
      const efg = (this.areaBasicChartTag).createLinearGradient(0, 0, 500, 0);
      efg.addColorStop(0, '#2ecc71');
      efg.addColorStop(1, '#2ecc71');

      this.areaBasicChartData = {
        labels: [0, 1, 2, 3, 4, 5, 6],
        datasets: [{
          label: 'D1',
          data: [45, 60, 45, 80, 60, 80, 45],
          fill: true,
          borderWidth: 4,
          borderColor: bcd,
          backgroundColor: bcd,
          hoverborderColor: bcd,
          hoverBackgroundColor: bcd,
        }, {
          label: 'D2',
          data: [45, 80, 45, 45, 60, 45, 80],
          fill: true,
          cubicInterpolationMode: 'monotone',
          borderWidth: 0,
          borderColor: '#0e9e4a',
          backgroundColor: '#0e9e4a',
          hoverborderColor: '#0e9e4a',
          hoverBackgroundColor: '#0e9e4a',
        }, {
          label: 'D3',
          data: [83, 45, 60, 45, 45, 55, 45],
          fill: true,
          borderWidth: 4,
          borderColor: efg,
          backgroundColor: efg,
          hoverborderColor: efg,
          hoverBackgroundColor: efg,
        }]
      };

      this.areaBasicChartOption = {
        barValueSpacing: 20
      };

      /* area fill origin chart */
      const areaFillOriginTag = (((this.areaFillOriginChart.nativeElement as HTMLCanvasElement).children));
      this.areaFillOriginChartTag = ((areaFillOriginTag['area_fill_origin_chart']).lastChild).getContext('2d');
      const bcde = (this.areaFillOriginChartTag).createLinearGradient(0, 0, 500, 0);
      bcde.addColorStop(0, '#3498db');
      bcde.addColorStop(1, '#3498db');

      this.areaFillOriginChartData = {
        labels: [0, 1, 2, 3, 4, 5, 6],
        datasets: [{
          label: 'D1',
          data: [85, 55, 70, 50, 75, 45, 60],
          borderWidth: 1,
          borderColor: bcde,
          backgroundColor: bcde,
          hoverborderColor: bcde,
          hoverBackgroundColor: bcde,
          fill: 'origin',
        }]
      };

      /* area fill end chart */
      const areaFillEndTag = (((this.areaFillEndChart.nativeElement as HTMLCanvasElement).children));
      this.areaFillEndChartTag = ((areaFillEndTag['area_fill_end_chart']).lastChild).getContext('2d');
      const cde = (this.areaFillEndChartTag).createLinearGradient(0, 0, 500, 0);
      cde.addColorStop(0, '#2ecc71');
      cde.addColorStop(1, '#2ecc71');

      this.areaFillEndChartData = {
        labels: [0, 1, 2, 3, 4, 5, 6],
        datasets: [{
          label: 'D1',
          data: [85, 55, 70, 50, 75, 45, 60],
          borderWidth: 1,
          borderColor: cde,
          backgroundColor: cde,
          hoverborderColor: cde,
          hoverBackgroundColor: cde,
          fill: 'end',
        }]
      };

      /* area radar1 cart */
      const areaRadar1Tag = (((this.areaRadar1Chart.nativeElement as HTMLCanvasElement).children));
      this.areaRadar1ChartTag = ((areaRadar1Tag['area_radar1_chart']).lastChild).getContext('2d');
      const pqr = (this.areaRadar1ChartTag).createLinearGradient(0, 0, 350, 0);
      pqr.addColorStop(0, '#1abc9c');
      pqr.addColorStop(1, '#1abc9c');
      const stu = (this.areaRadar1ChartTag).createLinearGradient(0, 0, 350, 0);
      stu.addColorStop(0, '#2ecc71');
      stu.addColorStop(1, '#2ecc71');

      this.areaRadar1ChartData = {
        labels: [0, 1, 2, 3, 4, 5, 6],
        datasets: [{
          label: 'D1',
          data: [60, 60, 45, 80, 60, 80, 45],
          fill: true,
          borderWidth: 4,
          borderColor: pqr,
          backgroundColor: pqr,
          hoverborderColor: pqr,
          hoverBackgroundColor: pqr,
        }, {
          label: 'D2',
          data: [40, 80, 40, 65, 60, 50, 95],
          fill: true,
          cubicInterpolationMode: 'monotone',
          borderWidth: 0,
          borderColor: '#0e9e4a',
          backgroundColor: '#0e9e4a',
          hoverborderColor: '#0e9e4a',
          hoverBackgroundColor: '#0e9e4a',
        }, {
          label: 'D3',
          data: [20, 40, 80, 60, 85, 60, 20],
          fill: true,
          borderWidth: 4,
          borderColor: stu,
          backgroundColor: stu,
          hoverborderColor: stu,
          hoverBackgroundColor: stu,
        }]
      };

      /* area radar2 cart */
      const areaRadar2Tag = (((this.areaRadar2Chart.nativeElement as HTMLCanvasElement).children));
      this.areaRadar2ChartTag = ((areaRadar2Tag['area_radar2_chart']).lastChild).getContext('2d');
      const pqrs = (this.areaRadar2ChartTag).createLinearGradient(0, 0, 350, 0);
      pqrs.addColorStop(0, '#4caf50');
      pqrs.addColorStop(1, '#4caf50');
      const stuv = (this.areaRadar2ChartTag).createLinearGradient(0, 0, 350, 0);
      stuv.addColorStop(0, '#FF9800');
      stuv.addColorStop(1, '#FF9800');

      this.areaRadar2ChartData = {
        labels: [0, 1, 2, 3, 4, 5, 6],
        datasets: [{
          label: 'D1',
          data: [60, 60, 45, 80, 60, 80, 45],
          fill: true,
          borderWidth: 4,
          borderColor: pqrs,
          backgroundColor: pqrs,
          hoverborderColor: pqrs,
          hoverBackgroundColor: pqrs,
        }, {
          label: 'D2',
          data: [40, 80, 40, 65, 60, 50, 95],
          fill: true,
          cubicInterpolationMode: 'monotone',
          borderWidth: 0,
          borderColor: '#f44336',
          backgroundColor: '#f44336',
          hoverborderColor: '#f44336',
          hoverBackgroundColor: '#f44336',
        }, {
          label: 'D3',
          data: [20, 40, 80, 60, 85, 60, 20],
          fill: true,
          borderWidth: 4,
          borderColor: stuv,
          backgroundColor: stuv,
          hoverborderColor: stuv,
          hoverBackgroundColor: stuv,
        }]
      };

      /* area radar3 cart */
      const areaRadar3Tag = (((this.areaRadar3Chart.nativeElement as HTMLCanvasElement).children));
      this.areaRadar3ChartTag = ((areaRadar3Tag['area_radar3_chart']).lastChild).getContext('2d');
      const xyz = (this.areaRadar3ChartTag).createLinearGradient(0, 0, 350, 0);
      xyz.addColorStop(0, '#1abc9c');
      xyz.addColorStop(1, '#1abc9c');
      const wxy = (this.areaRadar3ChartTag).createLinearGradient(0, 0, 350, 0);
      wxy.addColorStop(0, '#2ecc71');
      wxy.addColorStop(1, '#2ecc71');

      this.areaRadar3ChartData = {
        labels: [0, 1, 2, 3, 4, 5, 6],
        datasets: [{
          label: 'D1',
          data: [60, 60, 45, 80, 60, 80, 45],
          fill: true,
          borderWidth: 4,
          borderColor: xyz,
          backgroundColor: 'transparent',
          hoverborderColor: xyz,
          hoverBackgroundColor: 'transparent',
        }, {
          label: 'D2',
          data: [40, 80, 40, 65, 60, 50, 95],
          fill: true,
          cubicInterpolationMode: 'monotone',
          borderWidth: 0,
          borderColor: '#0e9e4a',
          backgroundColor: 'transparent',
          hoverborderColor: '#0e9e4a',
          hoverBackgroundColor: 'transparent',
        }, {
          label: 'D3',
          data: [20, 40, 80, 60, 85, 60, 20],
          fill: true,
          borderWidth: 4,
          borderColor: wxy,
          backgroundColor: 'transparent',
          hoverborderColor: wxy,
          hoverBackgroundColor: 'transparent',
        }]
      };

      /* pie cart */
      const pieTag = (((this.pieChart.nativeElement as HTMLCanvasElement).children));
      this.pieChartTag = ((pieTag['pie_chart']).lastChild).getContext('2d'); // doughnut_chart
      const cdef = (this.pieChartTag).createLinearGradient(100, 0, 300, 0);
      cdef.addColorStop(0, '#4caf50');
      cdef.addColorStop(1, '#4caf50');
      const wxyz = (this.pieChartTag).createLinearGradient(100, 0, 300, 0);
      wxyz.addColorStop(0, '#FF9800');
      wxyz.addColorStop(1, '#FF9800');

      this.pieChartData = {
        labels: ['Data 1', 'Data 2', 'Data 3'],
        datasets: [{
          data: [30, 30, 40],
          backgroundColor: [cdef, wxyz, '#f44336'],
          hoverBackgroundColor: [cdef, wxyz, '#f44336']
        }]
      };
    });
  }

}
