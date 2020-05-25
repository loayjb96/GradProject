// import { Component} from '@angular/core';
// import { Component, HostListener } from '@angular/core';
// added this to scroll to top 
import { Component, HostListener, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit ,OnDestroy {
  Subscription:Subscription;
  constructor(private router:Router){

  }
  ngOnInit(){
this.router.events
.pipe(
  filter(event=>event instanceof NavigationEnd))
  .subscribe(()=>window.scrollTo(0,0));

 

  }
  ngOnDestroy(){
this.Subscription.unsubscribe();
  }
}
