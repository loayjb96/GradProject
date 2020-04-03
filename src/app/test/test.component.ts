import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
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
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})

export class TestComponent  {
  readonly ROOT_URL='https://api.abilisense.com/v1/api/analizefile'
  readonly ROOT_URL1='https://api.abilisense.com/v1/api/loadclassifier'
  readonly ROOT_URL2='https://api.abilisense.com/v1/api/registerDevice'
  userid:string;
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
  res2: string;
   ResArray1: [string, string] = ["",""];
   ResArray2: [string, string] = ["",""];
  
  NewPost1: Observable<any>;
  now: string;
  rand: number;
  

  constructor(
    private storage: AngularFireStorage,private db:AngularFirestore,
    private af:AngularFireAuth,
    private route: ActivatedRoute,private router:Router,private http:HttpClient
    ) { 
    }
  selectedFile=null;

  async preview(files,event) {
    
    if (files.length === 0)
      return;
      console.log(event);

    this.selectedFile=<File>event.target.files[0];
    var mimeType = files[0].type;
    console.log(mimeType);
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
  
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    
    }
    const fd =new FormData();
    const url=  Math.random().toString(36).substring(7);
    this.name='/'+this.type+'/'+url;// this is wher rhe image will be stored 
    fd.append('image',this.selectedFile,this.selectedFile.name);
    this.ExtractPath();
     this.storage.ref(this.fullPath).child(this.selectedFile.name).put(this.selectedFile, {contentType: mimeType}).then(() => {
      this.pathWithFile=this.fullPath.concat("/").concat(this.selectedFile.name);
      this.check=true;
    
      this.downloadURL= this.storage.ref(this.pathWithFile).getDownloadURL().subscribe(result => {
       
        this.now = new Date().toLocaleString();
        this.delteurl=result;
        const Data={Url:result,Path:this.fullPath,Name:this.selectedFile.name,Date:this.now}
  

      
        this.db.collection('Category').doc(this.selectedFile.name).set(Data)
        console.log(Data)
        //this.newMessage(result);// here we send the url to the newMessege( string:url)_sending the url 
   
        })
     }) 
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
         console.log(actualData)

      
    
     })
    }
 this.pathWithFile=""
    this.contacts = [
      {name: "Animal"},
      {name: "Vehicles"},
      {name: "Babies"},
      {name: "Female"},
      {name: "Male"},
      {name: "Other"},
      
    ];
    this.path=[];
    this.fullPath="";
   
  }
  OnCategoryCheked(x:string,i:any){
    this.path[i]=x;

    this.Enable=true;
  }
  checkFileUpload():void{

    this.check=true;
  }
  addBlankRow() {  
      const blankRowData = new BlankRow();  
          blankRowData.RollNo = this.UserRole,  
          blankRowData.Name = this.UserName,  
          blankRowData.Algorithm = '',  
          blankRowData.Catagory = '',  
          this.blankRowArray.push(blankRowData)  
          
  }  
  ExtractPath(){
    for(let i=0;i<this.path.length;i++){
      if(i==0)
      this.fullPath="".concat(this.path[i]);
      else
      this.fullPath+="/".concat(this.path[i]);
    }
  }
  openMultiSelectDD(i) {  
      for (var x = 0; x < this.blankRowArray.length; x++) {  
          this.hideMultiSelectDropdownAll[x] = false;  
          this.hideMultiSelectedSubjectDropdownAll[x] = false;  
          this.hideMultiSelectedSubjectDropdown[x] = false;  
      }  
      this.hideMultiSelectDropdownAll[i] = true;  
      this.hideMultiSelectDropdown[i] = !this.hideMultiSelectDropdown[i];  
  }  
  openMultiSelectDDForSubject(i) {  
      for (var x = 0; x < this.blankRowArray.length; x++) {  
          this.hideMultiSelectedSubjectDropdownAll[x] = false;  
          this.hideMultiSelectDropdownAll[x] = false;  
          this.hideMultiSelectDropdown[x] = false;  
      }  
      this.hideMultiSelectedSubjectDropdownAll[i] = true;  
      this.hideMultiSelectedSubjectDropdown[i] = !this.hideMultiSelectedSubjectDropdown[i];  
  }  
  deleteRow(index) {  
      this.blankRowArray.splice(index, 1);  
      this.path.splice(index, 1);  
      if(this.path.length==0)
      this.Enable=false;
  }

  getPosts(){
    let params=new HttpParams().set('userId','1')
    this.Posts=this.http.get<Post[]>(this.ROOT_URL1).retry(1).
    catch(err=>{
      console.log(err)
      return Observable.of(err)
    })
    console.log('get request')

  }
  createPosts(){
    this.res=""
    this.res2=""
    this.ApiREquest(8000)
   this.ApiREquest(44100)
    console.log(this.res)
  
     this.rand=Math.floor(Math.random() * (100000 - 10000 + 1)) + 10000;
  }
  ApiREquest(channel){
   let header =new HttpHeaders()
   header=header.set('X-AbiliSense-API-Key','0479e58c-3258-11e8-b467-0ed5f89Tests')
   header=header.set('accept','application/json')
   let options = {headers:header};
   let params=new HttpParams().set('audiofile ',this.selectedFile)
   params=params.set('samplingrate',channel);
   const formData: FormData = new FormData();
   formData.append('audiofile', this.selectedFile);
   
   
   if(channel==8000){
    this.NewPost=this.http.post(this.ROOT_URL,formData,options)
    this.NewPost.subscribe(data=>{
      console.log(data.events.length)
      this.res= 'API Response ,'
      for (var i=0; i<data.events.length;i++){
     this.res+='Events: '+data.events[i].events+' | Time: '+data.events[i].time+',';
     this.ResArray1[0]=this.ResArray1[0].concat(" "+data.events[i].events)
     this.ResArray1[1]=this.ResArray1[1].concat(" "+data.events[i].time)
      }
      const Data={TesterName:this.UserName,Catagory:this.path,HZ8000:this.ResArray1,HZ44100:this.ResArray2,time:this.now,TestId:this.rand}
      this.db.collection('Tests').doc(this.rand.toString()).set(Data)
   })
  
   }
   else{
    this.NewPost1=this.http.post(this.ROOT_URL,formData,options)
   this.NewPost1.subscribe(data=>{
    this.res2= 'API Response ,'
    for (var i=0; i<data.events.length;i++){
   this.res2+='Events: '+data.events[i].events+' | Time: '+data.events[i].time+',';
   this.ResArray2[0]=this.ResArray2[0].concat(" "+data.events[i].events)
   this.ResArray2[1]= this.ResArray2[1].concat(" "+data.events[i].time)
    }
    const Data={TesterName:this.UserName,Catagory:this.path,HZ8000:this.ResArray1,HZ44100:this.ResArray2,time:this.now,TestId:this.rand}
      this.db.collection('Tests').doc(this.rand.toString()).set(Data)
 })
}
this.ResArray1=["",""]
this.ResArray2=["",""]

  
 

  

  }
}
