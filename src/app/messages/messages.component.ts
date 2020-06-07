import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'app/global.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  Message: any;

  constructor(private global:GlobalService) { }

  ngOnInit() {
    this.getMessages()
    
  }
  getMessages(){
    this.Message=this.global.GenaerateMessagesForUser()


  
  }
  deleteMsg(selectedItem: any){
this.global.deleteMessageUser(selectedItem)
  }
}
