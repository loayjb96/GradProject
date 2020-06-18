import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'app/auth/login/auth.service';

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
  ErrorCollection;
  Error: Observable<any[]> ;
  temp:string
  TestCollection;
  Test: Observable<any[]> ;
  testCount:Array<number>=[];
  data:Array<number>=[];
  data2:Array<number>=[];
  data3:Array<number>=[];
  data4:Array<number>=[];
  Testers:Array<number>=[];

  T_ID:Array<any>=[];
  ErrorAPi:Array<String>=[];
  ErrorChannel:Array<String>=[];
  FileName:Array<String>=[];
  Time:Array<String>=[];
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
  data544100: Array<number>=[];
  data5:  Array<number>=[];
  avergae544100: any;
  avergae5: any;
  role: any;
  constructor(private db:AngularFirestore, private af:AngularFireAuth,private router:Router,public authService: AuthService) { }
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
    let uid=this.authService.getToken()
    this.db.collection("users").doc(uid).get().toPromise().then(result => {
 
      const actualData = result.data();
      this.role=actualData.Role;
 
   

  })
  
    this. avergae=0
    this. avergae2=0
    this. avergae4=0
    this.avergae5=0;
    this.count=0
    this. avergae44100=0
    this. avergae244100=0
    this. avergae444100=0
    this.avergae544100=0;
    this.count44100=0

    this.usersCollection = this.db.collection<any>('users')
    this.contacts = this.usersCollection.valueChanges()
    this.TestCollection = this.db.collection<any>('Tests')
    this.Test = this.TestCollection.valueChanges()
    this.CategoryCollection = this.db.collection<any>('Category')
    this.Category = this.CategoryCollection.valueChanges()
    this.ErrorCollection = this.db.collection<any>('ApiErrors')
    this.Error = this.ErrorCollection.valueChanges()
    this.Test.subscribe(res => {
      this.res=res
      for(let k=0;k<res.length;k++){
        if(res[k].Result8000){
       this.data.push(res[k].Result8000[0])
       this.data2.push(res[k].Result8000[1])
       this.data3.push(res[k].Result8000[2])
       this.data4.push(res[k].Result8000[3])
       this.data5.push(res[k].Result8000[4])

       this.avergae+=res[k].Result8000[0]
       this.avergae2+=res[k].Result8000[1]
       this.avergae4+=res[k].Result8000[3]
       this.avergae5+=res[k].Result8000[4]
       this.count++
       
        }
        if(res[k].Result44100){
          this.data44100.push(res[k].Result44100[0])
          this.data244100.push(res[k].Result44100[1])
          this.data344100.push(res[k].Result44100[2])
          this.data444100.push(res[k].Result44100[3])
          this.data544100.push(res[k].Result44100[4])
         
          this.avergae44100+=res[k].Result44100[0]
          this.avergae244100+=res[k].Result44100[1]
          this.avergae444100+=res[k].Result44100[3]
          this.avergae544100+=res[k].Result44100[4]
          this.count44100++
          
           }
      this.testId.push(res[k].TestId)
      }
     
      this.avergae/=this.count
      this.avergae2/=this.count
      this.avergae4/=this.count
      this.avergae5/=this.count
      this.avergae44100/=this.count44100
      this.avergae244100/=this.count44100
      this.avergae444100/=this.count44100
      this.avergae544100/=this.count44100
       this.activateCharts()
       
   });
   this.contacts.subscribe(res => {
    for(let k=0;k<res.length;k++){
    
     this.Testers.push(res[k].fullName)
     if(res[k].Tests)
     this.testCount.push(res[k].Tests.length)
     else
     this.testCount.push(0)
  
    }

     this.activateCharts()
     
 });
 this.Error.subscribe(res=>{
  for(let k=0;k<res.length;k++){
    this.T_ID.push(res[k].TestId)
    this.temp=res[k].Error;
    this.ErrorAPi.push(this.temp)
    console.log(this.ErrorAPi)
   
    // this.FileName.push(res[k].Error.split("+")[0])
    // this.ErrorChannel.push(res[k].Error.split("+")[2])

  }

 })

  this.Category.subscribe(res=>{
    this.len=res.length
  })
  
      /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

  

  }
  activateCharts(){
    
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
      high:Math.max(...this.data)+15,// creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: -1, left: 0},
      axisX: {
        
        name:'Test',
        onlyInteger: true,
    },

    axisY: {
      showGrid:true,
      low:Math.min(...this.data),
            high:Math.max(...this.data)+0.5,
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
  high: this.data2.length+5, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
  chartPadding: { top: 0, right: 0, bottom: -1, left: 0},
  
  axisX: {
    
    name:'Test',
    onlyInteger: true,
},

axisY: {
  showGrid:true,
  low:Math.min(...this.data2),
        high:Math.max(...this.data2)+0.5,
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
      high: this.data4.length+2, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
       
  axisX: {
    
    name:'Test',
    onlyInteger: true,
},

axisY: {
  showGrid:true,
  low:Math.min(...this.data4),
        high:Math.max(...this.data4)+0.5,
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
high:Math.max(...this.data3),
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
labels: this.testId,
series: [
  this.data5,
  this.data544100


]
};




var websiteViewsChart2 = new Chartist.Bar('#websiteViewsChart2', datawebsiteViewsChart2, optionswebsiteViewsChart1, responsiveOptions1);

//start animation for the Emails Subscription Chart
this.startAnimationForBarChart(websiteViewsChart2);
//##############################################
//##############################################

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
  navigatetoaudio(){
    this.router.navigate(['/filerepository']);
  }
 

  delete(ID){
  
    this.db.collection("ApiErrors").doc(String(ID)).delete().then(function() {
      console.log("Document successfully deleted!");
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });

  
  }
}

