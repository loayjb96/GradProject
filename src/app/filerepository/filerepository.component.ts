import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage/storage';

@Component({
  selector: 'app-filerepository',
  templateUrl: './filerepository.component.html',
  styleUrls: ['./filerepository.component.scss']
})
export class FilerepositoryComponent implements OnInit {
  
  CategoryCollection;
  Category: Observable<any[]> ;
  subCategory:any
  audio: HTMLAudioElement;
  info: any;
  path: any;
  date: string;
  newDate: string[];
  newDate1: string;
  url: any;
  ngOnInit(): void {
    this.CategoryCollection = this.db.collection<any>('Category')
    this.Category = this.CategoryCollection.valueChanges()
    
  }
 

  constructor(private route: ActivatedRoute,private router: Router,private db:AngularFirestore,private storage: AngularFireStorage) {
 
    // var profileUrl =new Observable<string> );

       const ref = this.storage.ref('Animal/lion');
       var profileUrl = ref.getDownloadURL();
       console.log('lion ',profileUrl)
       
  

}
urrentSound(url):void{
  this.audio = new Audio();
this.audio.src = url;
this.audio.load();
this.audio.play();

  console.log(url)
}
stopCurrentSound():void{

  this.audio.pause();
}
PassInfo(cat):void{
  console.log('passinfo')
  console.log(cat)
  this.info=cat.Name
  this.path=cat.Path
    this.date=cat.Date
    this.newDate=this.date.split(",")
    this.date=this.newDate[0]
    this.newDate1=this.newDate[1]
    this.url=cat.Url
console.log(this.newDate)


}

  async fetchFileFromStorage(){
 
}

}
