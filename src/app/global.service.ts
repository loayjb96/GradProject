
<<<<<<< HEAD

=======
>>>>>>> parent of 4b57be5... Revert "messaging for users"
import { Router } from '@angular/router';

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { ElementSchemaRegistry } from '@angular/compiler';
import 'rxjs/Rx';
import { map } from 'rxjs/operators';

@Injectable()
export class GlobalService {
  Message: any;
  id: any;
  constructor(private router: Router,private db: AngularFirestore,   private af: AngularFireAuth) {}

 
  GenerateNewMessage(id,Data){
alert(Data.Message)
    this.db.collection("users").doc(id).collection("PrivateMessages").add(Data)
    
    
    
      }
      GetUser(){
        const user =this.af.auth.currentUser; 
        
        if(user!=null){
          this.db.collection("users").doc(user.uid).get().toPromise().then(result => {
             const actualData = result.data();
          
             this.id=actualData.Uid
            
         })
        }
        else
        {
         
          this.id =localStorage.getItem('LoggedIn')
    
        }
      
      }
      GenaerateMessagesForUser(){
        this.GetUser();
     alert(localStorage.getItem('LoggedIn'))
   
        this.Message=this.db.collection("users").doc(localStorage.getItem('LoggedIn')).collection('PrivateMessages').snapshotChanges().pipe(
          map(actions => actions.map(a => {
      
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
           
          return {data,id}
      
          }))
      );
    
    return this.Message
      }
      deleteMessageUser(data){
 
        
       
        this.db.collection("users").doc(localStorage.getItem('LoggedIn')).collection('PrivateMessages').doc(data).delete();
        
        
      }

}