import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Http } from '@angular/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpParams,HttpHeaders} from '@angular/common/http';
import { AngularFireStorage } from '@angular/fire/storage';
import { BlankRow } from 'app/blank-row';
import { AngularFirestore } from '@angular/fire/firestore';
import{Post} from './../posts'
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/retry'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/of'
import { Response } from '@angular/http'
import 'rxjs/Rx';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})

export class TestComponent  {
  readonly ROOT_URL='https://api.abilisense.com/v1/api/analizefile'
  readonly ROOT_URL1='https://api.abilisense.com/v1/api/loadclassifier'
  readonly ROOT_URL2='https://api.abilisense.com/v1/api/registerDevice'
  userid:any;
  type: string;
  message:string;// this is my url 
  urlImg:string;
  public imagePath:File;
  imgURL: any;
  name:string;
  downloadURL:any;
  delteurl:string;
  contacts:any[];
  path:any[];
  fullPath:string;
  Enable:boolean;
  pathWithFile:string;
  UserName:string;
  UserRole:string;
  check: boolean;
  Posts:Observable<any> 
  NewPost:Observable<any>
  res:string
  data:any=[]
  res2: string;
   ResArray1: [string, string] = ["",""];
   ResArray2: [string, string] = ["",""];
  test:string[]=[""];
  NewPost1: Observable<any>;
  now: string;
  rand: number;
  str: string;
  index:number=0
  index2:number=0
  Message=[];
  temp: any;
  done: boolean;
  FileName: string;
  

  constructor(
    private storage: AngularFireStorage,private db:AngularFirestore,
    private af:AngularFireAuth,
    private route: ActivatedRoute,private router:Router,private http:HttpClient,private http1: Http
    ) { 
    }
  
  selectedFile: File[] = [];

  async preview(files,event) {
    this.selectedFile=[]
    if (files.length === 0)
      return;
      this.pathWithFile=""
      var filesAmount = event.target.files.length;
     
      for (let i = 0; i < filesAmount; i++) {
        this.ExtractPath();
    this.selectedFile.push(<File>event.target.files[i]);
    alert(this.selectedFile.length)
    var mimeType = files[i].type;
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(event.target.files[i]); 
  
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    
    }
    
     this.storage.ref(this.fullPath).child(this.selectedFile[i].name).put(this.selectedFile[i], {contentType: mimeType}).then(() => {
      this.pathWithFile=this.fullPath.concat("/").concat(this.selectedFile[i].name);
      this.check=true;
      this.downloadURL= this.storage.ref(this.pathWithFile).getDownloadURL().subscribe(result => {
       
        this.now = new Date().toLocaleString();
        this.delteurl=result;
        const Data={Url:result,Path:this.fullPath,Name:this.selectedFile[i].name,Date:this.now}
  

      
        this.db.collection('Category').doc(this.selectedFile[i].name).set(Data)
   
        })
     }) 
    }
  }
  blankRowArray: Array < BlankRow > = [];  
  blankRowData = new BlankRow();  
  hideMultiSelectDropdownAll: boolean[] = [];  
  hideMultiSelectDropdown: boolean[] = [];  
  hideMultiSelectedSubjectDropdown: boolean[] = [];  
  hideMultiSelectedSubjectDropdownAll: boolean[] = [];  
  ngOnInit() { 
    const user =this.af.auth.currentUser;
    if(user!=null){
      this.db.collection("users").doc(user.uid).get().toPromise().then(result => {
         const actualData = result.data();
         this.UserName=actualData.fullName;
         this.UserRole=actualData.Role;
         this.test=actualData.Tests;
         console.log("actual data ",actualData.Tests)
         this.index=1;

      
    
     })
    }
 this.pathWithFile=""
    this.contacts = [
      {name: "Animallll"},
      {name: "Vehicles"},
      {name: "Babises"},
      {name: "Female"},
      {name: "Male"},
      {name: "Other"},
      
    ];
    this.path=[];
    this.fullPath="";
   
  }
  OnCategoryCheked(x:any,i:any){
    this.path[i]=x;
    this.temp=x;
    const Data= {path:x}// URL:this.messege what we send 
    
    if(i==0){
x=0
    }
    else
    x=this.blankRowArray[i-1].Catagory
 
    
          let a= this.http.post('https://systemtestproject-96b42.firebaseio.com/Category/'+x+'.json',Data)
          a.subscribe(  
           (response)=>{
           this.Enable=true;
         })
        
    
 
}
  checkFileUpload():void{

    this.check=true;
  }
  addBlankRow() {  
 if(this.index2!=0){
   this.index2=this.temp
 }
 else
 this.index2=0
    
    this.getPosts(this.index2).subscribe(  
      Message=>{this.Message=Message;
      this.addBlank()}
    
    );
    
     
          
  } 
  addBlank(){
    this.data=[]
    const blankRowData = new BlankRow();  
    blankRowData.RollNo = this.UserRole,  
    blankRowData.Name = this.UserName,  
    blankRowData.Algorithm = '',  
    blankRowData.Catagory = '',  
    this.blankRowArray.push(blankRowData) 
    for (let key in this.Message) {
           this.data[this.Message[key].path]=this.Message[key].path
      
     }
    console.log("secound ",this.data)
    this.index2++;
  } 
  ExtractPath(){
    for(let i=0;i<this.path.length;i++){
      if(i==0)
      this.fullPath="".concat(this.path[i]);
      else
      this.fullPath+="/".concat(this.path[i]);
    }
  }
  
  deleteRow(index) {  
      this.blankRowArray.splice(index, 1);  
      this.path.splice(index, 1);  
      if(this.path.length==0)
      this.Enable=false;
     
      if(index>0){
      this.index2=index;
      this.temp=this.blankRowArray[index-1].Catagory
      }
      else
      this.index2=0
  }

  getPosts(index:any){
   
    return this.http1.get('https://systemtestproject-96b42.firebaseio.com/Category/'+index+'.json')
    .map((response: Response) => {
      const data: Post[] = response.json();
      this.Message=data
      console.log(this.Message)
      return data;
    }

    ).catch(
      (error: Response) => {

        return Observable.throw('something went wrong');
      }

    );

  }
  createPosts(){
    this.res=""
    this.res2=""
    this.rand=Math.floor(Math.random() * (100000 - 10000 + 1)) + 10000;
    this.str=this.rand.toString()
    this.ApiREquest(8000)
   this.ApiREquest(44100)
   const user =this.af.auth.currentUser;
   if(user!=null){
    this.db.collection("users").doc(user.uid).get().toPromise().then(result => {
      const actualData = result.data();
      this.test=actualData.Tests;
  })
  this.test.push(this.str)
    let Tests=this.test 
    console.log(Tests)
     this.db.collection("users").doc(user.uid).set({
      Tests,
      }, { merge: true });
   }
  }
  ApiREquest(channel){
let Data={}
this.done=false;
   let header =new HttpHeaders()
   header=header.set('X-AbiliSense-API-Key','0479e58c-3258-11e8-b467-0ed5f89Tests')
   header=header.set('accept','application/json')
   let options = {headers:header};
   for(let i=0;i<this.selectedFile.length;i++){
    this.FileName=this.selectedFile[i].name
   const formData: FormData = new FormData();
   formData.append('audiofile', this.selectedFile[i]);
   formData.append('samplingrate', channel);

   
   if(channel==8000){
    this.NewPost=this.http.post(this.ROOT_URL,formData,options)
    this.NewPost.subscribe(data=>{
      this.res+=i+" "+this.selectedFile[i].name+","
      for (var j=0; j<data.events.length;j++){
      
     this.res+='Events: '+data.events[j].events+' | Time: '+data.events[j].time+',';
     this.ResArray1[0]=this.ResArray1[0].concat(" "+data.events[j].events)
     this.ResArray1[1]=this.ResArray1[1].concat(" "+data.events[j].time)
     
      }
     
      this.res+="_____________________________________,"
      //  Data={TesterName:this.UserName,Catagory:this.path,
      //   HZ8000:this.ResArray1,HZ44100:this.ResArray2,time:this.now,TestId:this.rand,Name:this.selectedFile[i].name} 
   })
   }
   
   else{
    this.NewPost1=this.http.post(this.ROOT_URL,formData,options)
   this.NewPost1.subscribe(data=>{
    // this.res2= 'API Response ,'
    this.res2+=i+" "+this.selectedFile[i].name+","
    for (var k=0; k<data.events.length;k++){
   this.res2+='Events: '+data.events[k].events+' | Time: '+data.events[k].time+',';
   this.ResArray2[0]=this.ResArray2[0].concat(" "+data.events[k].events)
   this.ResArray2[1]= this.ResArray2[1].concat(" "+data.events[k].time)
   this.done=true;
  
    }   
    this.res2+="_____________________________________,"
 })
}
Data={TesterName:this.UserName,Catagory:this.path,HZ8000:this.ResArray1,
  HZ44100:this.ResArray2,time:this.now,TestId:this.rand,Name:this.selectedFile[i].name}
  console.log("dd  ",Data)
  this.done=true;
  }
  console.log(Data)
  this.db.collection('Tests').doc(this.rand.toString()).set(Data)
this.ResArray1=["",""]
this.ResArray2=["",""]
  }
}
