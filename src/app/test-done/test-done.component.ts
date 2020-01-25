import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-test-done',
  templateUrl: './test-done.component.html',
  styleUrls: ['./test-done.component.scss']
})
export class TestDoneComponent implements OnInit {
  usersCollection;
  contacts: Observable<any[]> ;
  constructor(private route: ActivatedRoute,private router: Router,private db:AngularFirestore,private af:AngularFireAuth) {
   
  }

  ngOnInit() {
    this.usersCollection = this.db.collection<any>('users')
    this.contacts = this.usersCollection.valueChanges()
  }

}
