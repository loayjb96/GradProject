import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as Chartist from 'chartist';
import { stringify } from 'querystring';
@Component({
  selector: 'app-test-done',
  templateUrl: './test-done.component.html',
  styleUrls: ['./test-done.component.scss']
})
export class TestDoneComponent implements OnInit {
  usersCollection;
  contacts: Observable<any[]> ;
  TestCollection;
  Test: Observable<any[]> ;
  Res:Array<string>=[];
  Res2:Array<string>=[];
  count:Array<number>=[];
  id:number

  fileName: any;
  Name: string='all';
  category: any;
  
  constructor(private route: ActivatedRoute,private router: Router,private db:AngularFirestore,private af:AngularFireAuth) {
    
  }

  ngOnInit() {
    this.usersCollection = this.db.collection<any>('users')
    this.contacts = this.usersCollection.valueChanges()
    this.TestCollection = this.db.collection<any>('Tests')
    this.Test = this.TestCollection.valueChanges()
    
  }
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

activateChart($event, id){
 this.count=[]
 this.Res=[]
 this.Res2=[]
  this.id=id
 
  this.db.collection("Tests").doc(this.id.toString()).get().toPromise().then(result => {
    const actualData = result.data();
    let HZ44100=actualData.HZ44100;
    let HZ8000=actualData.HZ8000;
   this.category=actualData.Catagory;
    this.fileName=actualData.Name;
    console.log(this.fileName)
    // this.fileName=this.fileName.split(".wav")
  
for(let i=0,j=0,k=0;i<HZ8000.length,j<this.fileName.length,k<HZ44100.length;i++,j++,k++){
this.Res.push( HZ8000[i].split(" ")[0]);
this.Res2.push(HZ44100[k].split(" ")[0]);
this.fileName[i]=this.fileName[i].split(".wav")
this.count.push(i+1)
}
console.log(this.count)
console.log(this.Res)
console.log(this.category[0])
// this. splitted12 = HZ44100[0].split(" ").slice(1); 
// this. splitted22 = HZ44100[1].split(" ").slice(1); 
  const dataDailySalesChart: any = {
    labels:  this.Res,
    
    series: [
     this.count
       
    ]
  };

  
   const optionsDailySalesChart: any = {
    lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
    }),
    low: 1,
    high:this.Res.length+5, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
    height:200,
    width:550,
    chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
  }
  const dataDailySalesChart1: any = {
    labels: this.Res,
    series: [
        this.count
    ]
  };

  
   const optionsDailySalesChart1: any = {
    lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
    }),
    low: 1,
    high:this.Res2.length+5, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
    height:200,
    width:550,
    chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
  }
  
 

  setTimeout(()=>{    //<<<---    using ()=> syntax
    console.log("enter")
    var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);
    this.startAnimationForLineChart(dailySalesChart);
    var dailySalesChart1 = new Chartist.Line('#dailySalesChart1', dataDailySalesChart1, optionsDailySalesChart1);
    this.startAnimationForLineChart(dailySalesChart1);
}, 100);
})
this.accuaracy(this.Res,this.Res)
}
sortvia(userName){

  this.Name=userName
  this.ngOnInit
  // this.accuaracy()
  // this.accuaracy()
}
resetSort(){
  this.Name='all'
}
// here i want to write function to detrmine score Metrics to Evaluate your Machine

// accuaracy

accuaracy(arr1,arr2){
  var expected_value = ["dog", "dog", "cat", "cat",'baby',"baby","gf","goo"];
  var true_value =     ["dog", "Orange", "cat", "Mango","baby","grf","gf","goo"];

  var num_of_crosses=this.cross_matches(expected_value,true_value)
  try {
    var result=num_of_crosses/(true_value).length
    var fixed_result=result.toFixed(3)//i can detrmin to whic decimal to fixe
    console.log("result of accuaracy ",fixed_result)
  }
  catch(error) {
    console.error(error);
    // expected output: ReferenceError: nonExistentFunction is not defined
    // Note - error messages will vary depending on browser
  }

  console.log('cros matches inside  function ',num_of_crosses)


}
cross_matches(arr1,arr2){
var n = arr1
var m =arr2
var counter_crosses=0;
n.forEach((num1, index) => {
  const num2 = m[index];
  var n = num1.localeCompare(num2);
  

  if(n==0){
    counter_crosses+=1
  }
});
return counter_crosses
}
////////////////////
}
