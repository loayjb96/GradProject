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
  Resarray:Array<number>=[];
  count:Array<number>=[];
  id:number

  fileName: any;
  Name: string='all';
  category: any;
  accuracy: number;
  f1: number;
  precision: number;
  recall: number;
  accuracy2: number;
  recall2: number;
  precision2: number;
  f12: number;
  updated: boolean=false;
  
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
    if(!actualData.Result8000){
      this.updated=false
 
    }
    else
    this.updated=true
   
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
this.confision_matrix_function(this.category[0],this.Res,"1")
this.confision_matrix_function(this.category[0],this.Res2,"2")
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

}
sortvia(userName){

  this.Name=userName
  this.ngOnInit
}
resetSort(){
  this.Name='all'
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
confision_matrix_function(catagory,expected_value_api,str){
  this.Resarray=[]
  var arr2=expected_value_api
  // we want to find true postive true negtive 
  var tp =0;
  var tn=0;
  var fp=0;
  var fn=0
  var arrayLength = arr2.length;

  for (var i = 0; i < arrayLength; i++) {
      // console.log(myStringArray[i]);
      if(catagory==arr2[i]){
        tp+=1
      }else{
        fn+=1
      }
      //Do something
  }  


    console.log("array length=",arrayLength,"true postive ",tp,"false negtive",fn)
		var confusionMatrix = [
			[169, 10],
			[7, 46]
    ];
    var p = tp + fn;
    var n = fp + tn;
if(str==1){
  
    this. accuracy = (tp+tn)/(p+n);
    this. f1 = 2*tp/(2*tp+fp+fn);
    this. precision = tp/(tp+fp);
    this. recall = tp/(tp+fn);
    if(this.updated==false){
      alert(122)
    this.Resarray.push(this.accuracy,this.f1,this.precision,this.recall)
    this.db.collection("Tests").doc(this.id.toString()).set({
     Result8000: this.Resarray
    }, { merge: true });
  }
}
if(str==2){
  this. accuracy2 = (tp+tn)/(p+n);
  this. f12 = 2*tp/(2*tp+fp+fn);
  this. precision2 = tp/(tp+fp);
  this. recall2 = tp/(tp+fn);
  if(this.updated==false){
  this.Resarray.push(this.accuracy2,this.f12,this.precision2,this.recall2)
    this.db.collection("Tests").doc(this.id.toString()).set({
     Result44100: this.Resarray
    }, { merge: true });
  }
}
console.log("accuracy",this.accuracy,"f1",this.f1,"precision",this.precision,"recall",this.recall)
    


}




}
