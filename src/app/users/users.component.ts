import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog } from '@angular/material';
import { DialogOverviewExampleDialog } from '../dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import { Observable } from 'rxjs';
import { DeleteWarnComponent } from '../delete-warn/delete-warn.component';
import { AuthService } from 'app/auth/login/auth.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  itemPrice: string;
  usersCollection;
  contacts: Observable<any[]> ;

  name:string;
  Email:string;
  Role:string;
  message:string;
  Password:string;
  Uid :string="";
  Message :string= '';
  ErrorMessage:string= '';
  array={};
  data: any;
  role: any;


  constructor(private route: ActivatedRoute,private router: Router,public authService: AuthService,private db:AngularFirestore,private af:AngularFireAuth,public dialog: MatDialog) {
    this.usersCollection = db.collection<any>('users')
    this.contacts = this.usersCollection.valueChanges()

   }

  ngOnInit() {
    let uid=this.authService.getToken()

 
   
    this.db.collection("users").doc(uid).get().toPromise().then(result => {
 
      const actualData = result.data();
      this.role=actualData.Role;
 
   

  })
  console.log(this.role)
  }
  openDialog(): void {
    const pass={name:this.name,email:this.Email,Role:this.Role,Password:this.Password};
    console.log(pass)
    this.createNewUser(pass);
  }
  selectChangeHandler (event: any) {
   
    this.Role = event.target.value;
   
    
  }
  onEnterSite(data):void {
    this.router.navigateByUrl(`/Profile?Data=${data.Uid}`)
  }
  openDialogForDeletion(data): void {
   this.data=data
  
  }
  createNewUser(resultPassed): void {
   
    let password="123123"

    const fullName = resultPassed.name;
    const email = resultPassed.email;
    const UserRole=resultPassed.Role;
    if(resultPassed.password!=""){
   password=resultPassed.Password;
    }
    const Data= ({fullName: fullName,Email:email,
     Role:UserRole,Uid:"",Password:password ,Birthday:"",Tests:[]}) 
    console.log(password);
    this.af.auth.createUserWithEmailAndPassword(email,password)
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
 
  onDelete(){
  
    this.db.collection("users").doc(this.data.Uid).delete();
    
    
  }

}
