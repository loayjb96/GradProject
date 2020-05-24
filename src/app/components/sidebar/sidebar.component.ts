import { Component, OnInit } from '@angular/core';
import { Router, RouterModule ,NavigationEnd} from '@angular/router';
import { AuthService } from 'app/auth/login/auth.service';

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


export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private router: Router,public authService: AuthService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  //   this.router.events.subscribe((evt) => {
  //     if (!(evt instanceof NavigationEnd)) {
  //         return;
  //     }
  //     window.scrollTo(0, 0)
  // });//not working   till now 

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
