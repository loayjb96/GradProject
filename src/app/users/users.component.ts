import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog } from '@angular/material';
import { DialogOverviewExampleDialog } from '../dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import { Observable } from 'rxjs';
import { DeleteWarnComponent } from '../delete-warn/delete-warn.component';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  itemPrice: string;
  usersCollection;
  contacts: Observable<any[]> ;
  Role: string="";
  Name :string="";
  Email :string="";
  Uid :string="";
  Message :string= '';
  ErrorMessage:string= '';
  array={};

  constructor(private route: ActivatedRoute,private router: Router,private db:AngularFirestore,private af:AngularFireAuth,public dialog: MatDialog) {
    this.usersCollection = db.collection<any>('users')
    this.contacts = this.usersCollection.valueChanges()

   }

  ngOnInit() {
  }
  openDialog(): void {

console.log("here")
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {

      width: '600px',
      height: '500px',
      data: {Name: this.Name, Email: this.Email,Role: this.Role}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
      console.log(result);
      this.createNewUser(result);
    
    
      }
    });
    
  }
  onEnterSite(data):void {
    this.router.navigateByUrl(`/Profile?Data=${data.Uid}`)

  }
  openDialogForDeletion(data): void {
    const dialogRef = this.dialog.open(DeleteWarnComponent,{

      width: '600px',
      height: '300px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result.resp=='yes'){
        console.log(data)
      this.onDelete(data)
      }
    });
  }
  createNewUser(resultPassed): void {
   


    const fullName = resultPassed.name;
    const email = resultPassed.email;
    const UserRole=resultPassed.Role;
    const password="123123"
  
 
    const Data= ({fullName: fullName,Email:email,
     Role:UserRole,Uid:"",PhoneNumber:"" ,Birthday:"",Tests:"",Gender:""}) 
    console.log(resultPassed);
    this.af.auth.createUserWithEmailAndPassword(email, password)
    .then((result) => {
// 
      Data.Uid=result.user.uid;

      this.db.collection('users').doc(result.user.uid).set(Data)
      .then(() => {
        
        this.Message  ="New User Created!";
        
      
        setTimeout(() => 
        {
          this.sendEmailVerification();
        
          
        },
        4000);
      })
    })
  
  
 .catch(error=> {

 
  const errorCode = error.code;

  if (errorCode == 'auth/email-already-in-use') {
   
    this.ErrorMessage='Email Already in use!';
    setTimeout( () => {  this.ErrorMessage=""  }, 5000 );
    return;  
  }
  this.ErrorMessage="";
})
}
async sendEmailVerification() {
  await this.af.auth.currentUser.sendEmailVerification()
  }
 
  onDelete(data){
    console.log(data);  
    this.db.collection("users").doc(data.Uid).delete();
    
    
  }
  // contacts = [
  //   {id: 1, name: "Contact 001", description: "Contact 001 des", email: "c001@email.com",auth:"user"},
  //   {id: 2, name: "Contact 002", description: "Contact 002 des", email: "c002@email.com",auth:"user"},
  //   {id: 3, name: "Contact 003", description: "Contact 003 des", email: "c003@email.com",auth:"user"},
  //   {id: 4, name: "Contact 004", description: "Contact 004 des", email: "c004@email.com",auth:"user"},
  // ];

}
