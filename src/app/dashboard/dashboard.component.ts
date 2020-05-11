import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  usersCollection;
  contacts: Observable<any[]> ;
  TestCollection;
  Test: Observable<any[]> ;
  data:Array<number>=[];
  testId:Array<number>=[];
  avergae:any;
  count:any;
  constructor(private db:AngularFirestore) { }
  startAnimationForLineChart(chart){
      let seq: any, delays: any, durations: any;
      seq = 0;
      delays = 80;
      durations = 500;

      chart.on('draw', function(data) {
        if(data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if(data.type === 'point') {
              seq++;
              data.element.animate({
                opacity: {
                  begin: seq * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: 'ease'
                }
              });
          }
      });

      seq = 0;
  };
  startAnimationForBarChart(chart){
      let seq2: any, delays2: any, durations2: any;

      seq2 = 0;
      delays2 = 80;
      durations2 = 500;
      chart.on('draw', function(data) {
        if(data.type === 'bar'){
            seq2++;
            data.element.animate({
              opacity: {
                begin: seq2 * delays2,
                dur: durations2,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
      });

      seq2 = 0;
  };
  ngOnInit( 
  ) {
    this. avergae=0
    this.count=0

    this.usersCollection = this.db.collection<any>('users')
    this.contacts = this.usersCollection.valueChanges()
    this.TestCollection = this.db.collection<any>('Tests')
    this.Test = this.TestCollection.valueChanges()
    this.Test.subscribe(res => {
      for(let k=0;k<res.length;k++){
        if(res[k].Result8000){
       this.data.push(res[k].Result8000[0])
       this.avergae+=res[k].Result8000[0]
       this.count++
       
        }
      this.testId.push(res[k].TestId)
      }
      this.avergae/=this.count
       this.activateCharts()
       
   });
  
  
      /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

  

  }
  activateCharts(){
    console.log(this.data);
    const dataDailySalesChart: any = {
      labels: this.testId,
      series: [
       this.data
      ]
         
      
  };
  const dataDailySalesChart1: any = {
    labels: ['1', '2', '3', '4', '5', '6', '7'],
    series: [
        [142, 106, 57,107, 126, 78, 88]
    ]
};

 const optionsDailySalesChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
          tension: 10
      }),
      
     
      low: 0,
      high: this.data.length, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: -1, left: 0},
      axisX: {
        
        name:'Test',
        onlyInteger: true,
    },

    axisY: {
      showGrid:true,
      low:Math.min(...this.data),
            high:Math.max(...this.data)+0.1,
      type: Chartist.AutoScaleAxis,
      ticks: this.data,
    
      offset:40,
     
  }
  }
  const optionsDailySalesChart1: any = {
    lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
    }),
    low:50,
    high: 250, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
    chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
}

  var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);
  var dailySalesChart1 = new Chartist.Line('#dailySalesChart1', dataDailySalesChart1, optionsDailySalesChart1);

  this.startAnimationForLineChart(dailySalesChart);
  this.startAnimationForLineChart(dailySalesChart1);


  /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

  const dataCompletedTasksChart: any = {
      labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
      series: [
          [230, 750, 450, 300, 280, 240, 200, 190]
      ]
  };

 const optionsCompletedTasksChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0
      }),
      low: 0,
      high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
  }

  var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

  // start animation for the Completed Tasks Chart - Line Chart
  this.startAnimationForLineChart(completedTasksChart);



  /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

  var datawebsiteViewsChart = {
    labels: ['1', '2', '3', '4', '5','6','7'],
    series: [
      [42, 43, 84, 68, 85,90]

    ]
  };
  var optionswebsiteViewsChart = {
      axisX: {
          showGrid: false
      },
      low: 0,
      high: 100,
      chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
  };
  var responsiveOptions: any[] = [
    ['screen and (max-width: 640px)', {
      seriesBarDistance: 5,
      axisX: {
        labelInterpolationFnc: function (value) {
          return value[0];
        }
      }
    }]
  ];
  var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

  //start animation for the Emails Subscription Chart
  this.startAnimationForBarChart(websiteViewsChart);
  var websiteViewsChart1 = new Chartist.Bar('#websiteViewsChart1', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

  //start animation for the Emails Subscription Chart
  this.startAnimationForBarChart(websiteViewsChart1);


//##############################################
var datawebsiteViewsChart1 = {
labels: ['1', '2', '3', '4', '5','6','7'],
series: [
[62, 33, 44, 38, 85,50]

]
};
var optionswebsiteViewsChart1 = {
axisX: {
    showGrid: false
},
low: 0,
high: 100,
chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
};
var responsiveOptions1: any[] = [
['screen and (max-width: 640px)', {
seriesBarDistance: 5,
axisX: {
  labelInterpolationFnc: function (value) {
    return value[0];
  }
}
}]
];


var websiteViewsChart1 = new Chartist.Bar('#websiteViewsChart1', datawebsiteViewsChart1, optionswebsiteViewsChart1, responsiveOptions1);

//start animation for the Emails Subscription Chart
this.startAnimationForBarChart(websiteViewsChart1);

//##############################################
var datawebsiteViewsChart2 = {
labels: ['1', '2', '3', '4', '5','6','7'],
series: [
[22, 13, 24, 48, 85,40]

]
};




var websiteViewsChart2 = new Chartist.Bar('#websiteViewsChart2', datawebsiteViewsChart2, optionswebsiteViewsChart1, responsiveOptions1);

//start animation for the Emails Subscription Chart
this.startAnimationForBarChart(websiteViewsChart2);
//##############################################
//##############################################
var datawebsiteViewsChart3 = {
labels: ['1', '2', '3', '4', '5','6','7'],
series: [
[82, 73, 84, 68, 85,60]

]
};




var websiteViewsChart3 = new Chartist.Bar('#websiteViewsChart3', datawebsiteViewsChart3, optionswebsiteViewsChart1, responsiveOptions1);

//start animation for the Emails Subscription Chart
this.startAnimationForBarChart(websiteViewsChart3);
//##############################################
  }

}
