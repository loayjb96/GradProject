import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { Http } from '@angular/http';
import { AngularFireStorage } from '@angular/fire/storage';
import { BlankRow } from 'app/blank-row';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent  {

  userid:string;
  type: string;
  message:string;// this is my url 
  urlImg:string;
  public imagePath;
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
  

  constructor(
    private storage: AngularFireStorage,private db:AngularFirestore,
    private af:AngularFireAuth,
    private route: ActivatedRoute,private router:Router,private http:Http
    ) { 

    }
  selectedFile=null;

  preview(files,event) {
    
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
    
      this.downloadURL= this.storage.ref(this.name).getDownloadURL().subscribe(result => {
       
        
        this.delteurl=result;
        const Data=[{Url:result}];
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
    
   
}
