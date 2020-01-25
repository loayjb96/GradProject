import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { AuthService } from './../login/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 isLoading:boolean=false;
 ErrorMessage :string= '';
 email:string='';// this well be my email 
  constructor(private authService:AuthService, private router: Router) { }

  ngOnInit() {
  }
  emailupdate(event:any){
   // console.log('inside update '+event);
    this.email = event.target.value;
    
  }
  resetPassword() { 
    //console.log('inside the restfunction');
    console.log("email is "+this.email)
    

    if (!this.email) { 
      alert('Type in your email first'); 
    }
    this.authService.resetPasswordInit(this.email) 
    .then(
      () => alert('A password reset link has been sent to your emailaddress'), (rejectionReason) => alert(rejectionReason)) 
    .catch(e => alert('An error occurred while attempting to reset your password')); 

    
  }
onSignin(form: NgForm){

  const email = form.value.email;
    const password = form.value.password;
    this.isLoading=true;

    setTimeout( () => {  this.isLoading=false;   }, 3000 );
    this.authService.signinUser(email, password).then(result => {
      this.ErrorMessage = result
      console.log(result)
      this.router.navigate(['/dashboard']);
    })
  
  setTimeout( () => {  ; this.ErrorMessage="" ; }, 9000 );
   
    

}
}