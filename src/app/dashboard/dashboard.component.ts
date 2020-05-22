import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  usersCollection;
  contacts: Observable<any[]> ;
  CategoryCollection;
  Category: Observable<any[]> ;
  TestCollection;
  Test: Observable<any[]> ;
  testCount:Array<number>=[];
  data:Array<number>=[];
  data2:Array<number>=[];
  data3:Array<number>=[];
  data4:Array<number>=[];
  Testers:Array<number>=[];
  testId:Array<number>=[];
  avergae:any;
  avergae2:any;
  avergae3:any;
  avergae4:any;
  count:any;
  data44100: Array<number>=[];
  data244100: Array<number>=[];
  data344100: Array<number>=[];
  data444100: Array<number>=[];
  avergae44100: any;
  avergae244100: any;
  avergae344100: any;
  avergae444100: any;
  count44100: any;
  res: any[];
  Measure: string;
  tablenum: number=0;
  len: number;
  constructor(private db:AngularFirestore,private router:Router) { }
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
    this. avergae2=0
    this. avergae4=0
    this.count=0
    this. avergae44100=0
    this. avergae244100=0
    this.count44100=0

    this.usersCollection = this.db.collection<any>('users')
    this.contacts = this.usersCollection.valueChanges()
    this.TestCollection = this.db.collection<any>('Tests')
    this.Test = this.TestCollection.valueChanges()
    this.usersCollection = this.db.collection<any>('Category')
    this.contacts = this.usersCollection.valueChanges()
    this.Test.subscribe(res => {
      this.res=res
      for(let k=0;k<res.length;k++){
        if(res[k].Result8000){
       this.data.push(res[k].Result8000[0])
       this.data2.push(res[k].Result8000[1])
       this.data3.push(res[k].Result8000[2])
       this.data4.push(res[k].Result8000[3])

       this.avergae+=res[k].Result8000[0]
       this.avergae2+=res[k].Result8000[1]
       this.avergae4+=res[k].Result8000[3]
       this.count++
       
        }
        if(res[k].Result44100){
          this.data44100.push(res[k].Result44100[0])
          this.data244100.push(res[k].Result44100[1])
          this.data344100.push(res[k].Result44100[2])
          this.data444100.push(res[k].Result44100[3])
   
          this.avergae44100+=res[k].Result44100[0]
          this.avergae244100+=res[k].Result44100[1]
          this.count44100++
          
           }
      this.testId.push(res[k].TestId)
      }
     
      this.avergae/=this.count
      this.avergae2/=this.count
      this.avergae4/=this.count
      this.avergae44100/=this.count44100
      this.avergae244100/=this.count44100
       this.activateCharts()
       
   });
   this.contacts.subscribe(res => {
    for(let k=0;k<res.length;k++){
     console.log(res[k])
     this.Testers.push(res[k].fullName)
     if(res[k].Tests)
     this.testCount.push(res[k].Tests.length)
     else
     this.testCount.push(0)
  
    }
    console.log(this.Testers)
    console.log(this.testCount)
     this.activateCharts()
     
 });
 this.contacts.subscribe(res=>{
   this.len=res.length
 })
  
  
      /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

  

  }
  activateCharts(){
    console.log(this.data);
    const dataDailySalesChart: any = {
      labels: this.testId,
      series: [
       this.data,
       this.data44100
      ]
         
      
  };
  const dataDailySalesChart1: any = {
    labels: this.testId,
    series: [
       this.data2,
       this.data244100
    
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
      tension: 10
  }),
  
 
  low: 0,
  high: this.data2.length, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
  chartPadding: { top: 0, right: 0, bottom: -1, left: 0},
  
  axisX: {
    
    name:'Test',
    onlyInteger: true,
},

axisY: {
  showGrid:true,
  low:Math.min(...this.data2),
        high:Math.max(...this.data2)+0.1,
  type: Chartist.AutoScaleAxis,
  ticks: this.data2,

  offset:40,
 
}
}

  var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);
  var dailySalesChart1 = new Chartist.Line('#dailySalesChart1', dataDailySalesChart1, optionsDailySalesChart1);

  this.startAnimationForLineChart(dailySalesChart);
  this.startAnimationForLineChart(dailySalesChart1);


  /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

  const dataCompletedTasksChart: any = {
      labels: this.testId,
      series: [
          this.data4,
          this.data444100
      ]
  };

 const optionsCompletedTasksChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0
      }),
      low: 0,
      high: this.data4.length, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
       
  axisX: {
    
    name:'Test',
    onlyInteger: true,
},

axisY: {
  showGrid:true,
  low:Math.min(...this.data4),
        high:Math.max(...this.data4)+0.1,
  type: Chartist.AutoScaleAxis,
  ticks: this.data4,

  offset:40,
 
}
      
  }

  var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

  // start animation for the Completed Tasks Chart - Line Chart
  this.startAnimationForLineChart(completedTasksChart);



  /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

  var datawebsiteViewsChart = {
    labels:this.Testers,
    series: [
     this.testCount
    ]
  };
  var optionswebsiteViewsChart = {
      axisX: {
          showGrid: true
      },
      
      low:Math.min(...this.testCount),
              high:Math.max(...this.testCount)+0.1,
      chartPadding: { top: 0, right: 5, bottom: 0, left: 0},
      axisY: {
        showGrid:true,
        low:Math.min(...this.testCount),
              high:Math.max(...this.testCount)+0.1,
        
        ticks: this.testCount
      
      
       
    }
      
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
labels: this.testId,
series: [
this.data3,
this.data344100

]
};
var optionswebsiteViewsChart1 = {
axisX: {
    showGrid: false
},
low: 0,
high: this.data3.length,
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
  assign(tablenum){
    this.tablenum=tablenum
    if(tablenum==1)
    this.Measure="Accuracy"
    if(tablenum==2)
    this.Measure="F1_Score"
    if(tablenum==3)
    this.Measure="Recall"
  }
  navigatetousers(){
    this.router.navigate(['/Users']);
  }
  navigatetotests(){
    this.router.navigate(['/TestsDone']);
  }
}

