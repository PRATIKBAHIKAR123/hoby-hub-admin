import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

/**
 * Ecommerce Component
 */
export class DashboardComponent implements OnInit {

  // bread crumb items
  studentChart: any;
  splineAreaChart: any;
  constructor() { }

  ngOnInit() {
    this._splineAreaChart('["--vz-info", "--vz-primary"]');
    this._studentChart('["#fff", "#D0D0D0"]');
  }

  setbalancevalue(value: any) {
    if(value == 'today'){
        this.splineAreaChart.series = [{
            name: 'Active Student',
            data: [20, 25, 30, 35, 40, 55, 70, 110, 150, 180, 210, 250]
        }, {
            name: 'Inactive Student',
            data: [12, 17, 45, 42, 24, 35, 42, 75, 102, 108, 156, 199]
        }]
    }
    if(value == 'last_week'){
        this.splineAreaChart.series = [{
            name: 'Revenue',
            data: [30, 35, 40, 45, 20, 45, 20, 100, 120, 150, 190, 220]
        }, {
            name: 'Inactive Student',
            data: [12, 17, 45, 52, 24, 35, 42, 75, 92, 108, 146, 199]
        }]
    }
    if(value == 'last_month'){
        this.splineAreaChart.series = [{
            name: 'Revenue',
            data: [20, 45, 30, 35, 40, 55, 20, 110, 100, 190, 210, 250]
        }, {
            name: 'Inactive Student',
            data: [62, 25, 45, 45, 24, 35, 42, 75, 102, 108, 150, 299]
        }]
    }
    if(value == 'current_year'){
        this.splineAreaChart.series = [{
            name: 'Revenue',
            data: [27, 25, 30, 75, 70, 55, 50, 120, 250, 180, 210, 250]
        }, {
            name: 'Inactive Student',
            data: [12, 17, 45, 42, 24, 35, 42, 75, 102, 108, 156, 199]
        }]
    }

    
}

   private _splineAreaChart(colors:any) {
    colors = this.getChartColorsArray(colors);
    this.splineAreaChart = {
      series: [{
          name: 'Active Student',
          data: [75, 82, 78, 85, 65, 55, 85, 90, 95, 60]
      },{
          name: 'Inactive Student',
          data: [45, 60, 42, 37, 32, 25, 50, 40, 75, 45]
      }],
      chart: {
          height: 290,
          type: 'area',
          toolbar: 'false',
      },
      dataLabels: {
          enabled: false
      },
      stroke: {
          curve: 'smooth',
          width: 0,
      },
      xaxis: {
          categories: ['1 Jan', '2 Jan', '3 Jan', '4 Jan', '5 Jan', '6 Jan', '7 Jan', '8 Jan', '9 Jan', '10 Jan']
      },
      yaxis: {
          tickAmount: 5,
          min: 10,
          max: 100
      },
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'right', // Align legend: 'left', 'center', or 'right'
        floating: false
    },
      fill: {
          opacity: 0.06,
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.2,
            stops: [0, 90, 100],
            colorStops: [
                [
                    { offset: 0, color: "#ADB7F9", opacity: 1 }, // Sales Start
                    { offset: 100, color: "#B1B9F8", opacity: 0.5 } // Sales End
                ],
                [
                    { offset: 0, color: "#F4A79D", opacity: 1 }, // Revenue Start
                    { offset: 100, color: "#F4A79D", opacity: 0.5 } // Revenue End
                ]
            ]
        }
      }
    };
  }

  private _studentChart(colors:any) {
    colors = this.getChartColorsArray(colors);
    this.studentChart = {
      series: [{
          name: 'Active Students',
          data: [45, 25, 65, 35, 40, 55, 70, 60, 80, 70, 90, 50]
      },{
          name: 'InActive Students',
          data: [40, 20, 60, 30, 35, 50, 65, 55, 75, 65, 85, 45]
      }],
      chart: {
          height: 180,
          type: 'area',
          toolbar: 'false',
      },
      dataLabels: {
          enabled: false
      },
      stroke: {
          curve: 'smooth',
          width: 2,
          colors: ['#000', '#c8c8c8',]
      },
      labels: {
        show: false,
      },
      grid: {
        show: false,
      },
      xaxis: {
        lines: {
          show: false,
        },
        labels: {
          show: false,
        },
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      yaxis: {
          tickAmount: 5,
          min: 0,
          max: 100,
          labels: {
            show: false,
          },
      },
      colors: colors,
      fill: {
          opacity: 0.06,
          type: 'solid',
          colors: ['#fff', '#c8c8c8',]
      },
      legend: {
        show: false
    },
    };
  }


  private getChartColorsArray(colors:any) {
    colors = JSON.parse(colors);
    return colors.map(function (value:any) {
      var newValue = value.replace(" ", "");
      if (newValue.indexOf(",") === -1) {
        var color = getComputedStyle(document.documentElement).getPropertyValue(newValue);
            if (color) {
            color = color.replace(" ", "");
            return color;
            }
            else return newValue;;
        } else {
            var val = value.split(',');
            if (val.length == 2) {
                var rgbaColor = getComputedStyle(document.documentElement).getPropertyValue(val[0]);
                rgbaColor = "rgba(" + rgbaColor + "," + val[1] + ")";
                return rgbaColor;
            } else {
                return newValue;
            }
        }
    });
  }

}
