// added this to scroll to top 
import { Component, HostListener, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  template: '<router-outlet></router-outlet>',

  styleUrls: ['./app.component.css']
})



// export class AppComponent implements OnInit ,OnDestroy {
//   Subscription:Subscription;
//   constructor(private router:Router){

//   }
//   ngOnInit(){
// this.router.events
// .pipe(
//   filter(event=>event instanceof NavigationEnd))
//   .subscribe(()=>window.scrollTo(0,0));

 

//   }
//   ngOnDestroy(){
// this.Subscription.unsubscribe();
//   }
// }
export class AppComponent {

  
  constructor(private router: Router) { 
  //   this.router.events.subscribe(evt => {
  //     console.log("pressed")
  //     window.scrollTo(0, 0)
  //     // document.querySelector('sidebar-wrapper').scrollTop = 0;

  //     if (evt instanceof NavigationEnd) {
  //       // document.querySelector('sidebar-wrapper').scrollTop = 0;
  //     }
  // });
//   this.router.events.filter(event => event instanceof NavigationEnd)
//   .subscribe(() => {
//           console.log("pressed on route")

//       // const contentContainer = document.querySelector('.wrap') ;
//       window.scrollTo(0, 0);
//       document.body.scrollTop = 0;

// });
  }

  changeOfRoutes() {
    console.log("inside router change")
    window.scrollTo(0,0)
}
}

