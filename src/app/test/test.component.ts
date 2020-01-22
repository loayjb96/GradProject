import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { Http } from '@angular/http';
import { AngularFireStorage } from '@angular/fire/storage';
import { BlankRow } from 'app/blank-row';
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

  constructor(
    private storage: AngularFireStorage,
    private af:AngularFireAuth,
    private route: ActivatedRoute,private router:Router,private http:Http
    ) { }
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
    
     this.storage.ref("a").child(this.selectedFile.name).put(this.selectedFile, {contentType: mimeType}).then(() => {
      
       console.log("aa")
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
  
  }  
  addBlankRow() {  
      const blankRowData = new BlankRow();  
          blankRowData.RollNo = 'Tester',  
          blankRowData.Name = '',  
          blankRowData.Algorithm = '',  
          blankRowData.Catagory = '',  
          this.blankRowArray.push(blankRowData)  
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
  }  

}
