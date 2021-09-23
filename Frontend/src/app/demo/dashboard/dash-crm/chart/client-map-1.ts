export class ClientMap1 {
  public static crmChartData = {
    chart: {
      type: 'area',
      height: 90,
      sparkline: {
        enabled: true
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#1abc9c'],
    fill: {
      type: 'solid',
      opacity: 0.4,
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    series: [{
      name: 'series1',
      data: [20, 10, 18, 12, 25, 10, 20]
    }],
    yaxis: {
      min: 0,
      max: 30,
    },
    tooltip: {
      theme: 'dark',
      fixed: {
        enabled: false
      },
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: (seriesName) => 'Activity'
        }
      },
      marker: {
        show: false
      }
    }
  };
}
