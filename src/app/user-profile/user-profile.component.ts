import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Http } from '@angular/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  UserName:string;
  UserRole:string;
  UserTests:string;
  UserPhone:string;
  UserEmail:string;
  Uid: string;
  whenToShow: boolean;
  length: number;
  



  constructor(
    private storage: AngularFireStorage,private db:AngularFirestore,
    private af:AngularFireAuth,
    private route: ActivatedRoute,private router:Router,private http:Http
    ) { 

    }
   
      private afterGotUidFromQueryParam(): void {
  
        this.db.collection('users').doc(this.Uid).get().toPromise().then(result => {
          const user =this.af.auth.currentUser;
          const Data = result.data()
          console.log(Data);
          this.UserName=Data.fullName;
          this.UserRole=Data.Role;
          this.UserPhone=Data.PhoneNumber;
          this.UserEmail=Data.Email;
          this.UserTests=Data.Tests;
          if( this.UserTests)
          this.length=this.UserTests.length
          else
          this.length=0
          console.log(this.Uid)
          if(user.uid==this.Uid){
          
            this.whenToShow=true;
           }
      
        })
        
      }
  ngOnInit() {
    
    const user =this.af.auth.currentUser; 
    if(user!=null){
      this.db.collection("users").doc(user.uid).get().toPromise().then(result => {
         const actualData = result.data();
         this.UserName=actualData.fullName;
         this.UserRole=actualData.Role;
         this.UserPhone=actualData.PhoneNumber;
         this.UserEmail=actualData.Email;
         this.UserTests=actualData.Tests
         console.log(actualData)
     })
    

     
    
     
    }
    this.route.queryParams.subscribe(params => {
    
      this.Uid=params['Data'];
      this.afterGotUidFromQueryParam()
    })
  }

}
