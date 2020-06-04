import { Component, OnInit } from '@angular/core';
import { Router, RouterModule ,NavigationEnd} from '@angular/router';
import { AuthService } from 'app/auth/login/auth.service';
import { NgModel } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'General Overview',  icon: 'dashboard', class: '' },
    { path: '/Test', title: 'New Test',  icon: 'note_add', class: '' },
    { path: '/Users', title: 'Users',  icon: 'supervised_user_circle', class: '' },
    { path: '/TestsDone', title: 'Past Tests',  icon: 'tv', class: '' },
    { path: '/filerepository', title: 'File Repository',  icon: 'file_copy', class: '' },


  
    
];

// export const routing = RouterModule.forRoot(appRoutes, { scrollPositionRestoration: 'top' });


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  // template: '<router-outlet (activate)="onActivate($event, outlet)" #outlet></router-outlet> 

})
// @NgModel





export class SidebarComponent implements OnInit {
  menuItems: any[];

  role: any;

  userCollection;
  user: Observable<any[]> ;
  constructor(private router: Router,private db:AngularFirestore,public authService: AuthService,private af:AngularFireAuth) { }
  ngOnInit() {
   
    let uid=this.authService.getToken()
    this.userCollection = this.db.collection<any>('users')
    this.user = this.userCollection.valueChanges()
    this.user.subscribe(value=>{for(let i=0;i<value.length;i++){

 if(value[i].Uid==uid)
 this.assign(value[i].Role )

 this.menuItems = ROUTES.filter(menuItem => menuItem);

    }
   
 
    })
  
   
    

   
   
  
 
  }
  assign(role){
    console.log(role)
    this.role=role
  }
   isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
  LogIn(){
    this.router.navigate(['/login']);
    console.log("loged")

  }
 
}
