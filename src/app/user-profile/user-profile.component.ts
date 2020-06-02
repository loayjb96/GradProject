import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Http } from '@angular/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, ActivatedRoute } from '@angular/router';
import{GlobalService} from '../global.service'
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
  Message=""
  id: any;
  CurrentUserName: string;
  CurrentUserEmail: string;
  SystemUser: any;
  



  constructor(
    private storage: AngularFireStorage,private db:AngularFirestore,
    private af:AngularFireAuth,
    private route: ActivatedRoute,private router:Router,private http:Http,private global:GlobalService
    ) { 

    }
   
      private afterGotUidFromQueryParam(): void {
  
        this.db.collection('users').doc(this.Uid).get().toPromise().then(result => {
          const user =this.af.auth.currentUser;
          const Data = result.data()
          
          this.UserName=Data.fullName;
          this.UserRole=Data.Role;
          this.UserPhone=Data.PhoneNumber;
          this.UserEmail=Data.Email;
          this.UserTests=Data.Tests;
          if( this.UserTests)
          this.length=this.UserTests.length
          else
          this.length=0
        
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
         this.CurrentUserName=actualData.fullName;
         this.CurrentUserEmail=actualData.Email;
         this.id=actualData.Uid
        
     })
    

     
    
     
    }
    else
    {
      var SystemUser =localStorage.getItem('LoggedIn')
      this.db.collection("users").doc(SystemUser).get().toPromise().then(result => {
        const actualData = result.data();
        this.CurrentUserName=actualData.fullName;
        this.CurrentUserEmail=actualData.Email;
        this.id=actualData.Uid
       
    })
  
    }
    this.route.queryParams.subscribe(params => {
    
      this.Uid=params['Data'];
      this.afterGotUidFromQueryParam()
    })
  }
  print(){
    
    const Data={Email:this.CurrentUserEmail,Name:this.CurrentUserName,Message:this.Message,Date:new Date().toLocaleString()}

    this.global.GenerateNewMessage(this.Uid,Data)
  }

}
