
import { Router } from '@angular/router';

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class AuthService {
  ErrorMessage :string= '';
  token: string;
public Role:string;
  constructor(private router: Router,private db: AngularFirestore,   private afAuth: AngularFireAuth) {}

  signupUser(email: string, password: string,name: string,number: string) {
   //this.Loading();
   
   this.afAuth.auth.createUserWithEmailAndPassword(email, password)  .then((result) => {
    //  this.dismissLoading()
      this.db.collection('users').doc(result.user.uid).set({ fullName: name,Number:number })
      .then(() => {
        
        this.router.navigateByUrl('/home')
      })
    })
      .catch(
        error => console.log(error)
      )
  }

  signinUser(email: string, password: string):Promise<any> {
     
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.router.navigate(['']);
          this.afAuth.auth.currentUser.getIdToken()
            .then((token: string) => {
                this.token = token
              }
            )

            this.db.collection("users").doc(this.afAuth.auth.currentUser.uid).get().toPromise().then(result => {
              const actualData = result.data();
              //this.Role=actualData.Role;
          })

        }
      )
      .catch(error=> {
      
        const errorCode = error.code;
         if (errorCode == 'auth/user-not-found') {
          this.ErrorMessage='UserName is Incorrect';
          console.log('UserName is Incorrect');
          return this.ErrorMessage;     
        }

        else if (errorCode == 'auth/wrong-password') {
          this.ErrorMessage=' password is Incorrect ';
          console.log('סיסמה שגויה');
          return this.ErrorMessage;          ;     
        }

     
        this.ErrorMessage="";
       
      })
    //  return this.ErrorMessage;
  }


  logout() {
    this.Role='user';
    this.afAuth.auth.signOut().then(
        response=>{
            this.router.navigate(['/']);
        }
    )
    this.token = null;
  }

  getToken() {
    this.afAuth.auth.currentUser.getIdToken()
      .then(
        (token: string) => this.token = token
      );
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }
  /// addedd   
  resetPasswordInit(email: string) { 
    return this.afAuth.auth.sendPasswordResetEmail(
      email, 
      { url: 'http://localhost:4200/login' }); 
    } 
    getAuth() { 
      return this.afAuth.auth; 
    } 
 ///// 
 userRole(){
return this.Role
}



}