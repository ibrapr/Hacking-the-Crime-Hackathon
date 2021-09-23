export class NumbineChartData {
  constructor(){}

  

  public static pieDataPush(num) {
    NumbineChartData.pie1CAC.series.push(num);
  }
  public lineDataPush(num) {
    NumbineChartData.line3CAC.series.push(num);
  }
  public barDataPush(num) {
    NumbineChartData.bar2CAC.series.push(num);
  }

  
  public static pie1CAC = {
    chart: {
      height: 320,
      type: 'pie',
    },
    labels: ['Admin', 'Config', 'Tester'],
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
  public static line3CAC = {
    chart: {
      height: 300,
      type: 'line',
      zoom: {
        enabled: false
      },
    },
    series: [{
      name: '',
      data: []
    },
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
      text: 'Users report',
      align: 'left'
    },
    markers: {
      size: 0,

      hover: {
        sizeOffset: 6
      }
    },
    xaxis: {
      categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8', 'Week 9',
        'Week 10', 'Week 11', 'Week 12', 'Week 13', 'Week 14'],
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
  public static bar2CAC = {
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
      name: 'PowerPoint',
      data: [44, 55, 41, 67, 22, 43, 2, 32]
    }, {
      name: 'Excel',
      data: [13, 23, 20, 8, 13, 27, 32, 32]
    }, {
      name: 'DellP',
      data: [11, 17, 15, 15, 21, 14, 5, 20]
    }, {
      name: 'Dell S',
      data: [21, 7, 25, 13, 22, 8, 10, 13],
    },
    {
      name: 'Dell product',
      data: [21, 7, 25, 13, 22, 8, 15, 23]
    }
    ],
    xaxis: {
      type: 'datetime',
      categories: ['01/01/2021 GMT', '01/02/2021 GMT', '01/03/2021 GMT', '01/04/2021 GMT', '01/05/2021 GMT', '01/06/2021 GMT'],
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
