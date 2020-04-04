
import { MatDialogRef } from "@angular/material/dialog";
import {Component } from "@angular/core";


@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.component.html',
  styleUrls: ['./dialog-overview-example-dialog.component.css']
})

export class DialogOverviewExampleDialog {
  name:string;
  Email:string;
  Role:string;
  message:string;
  Password:string;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,)
 {}

  onNoClick(): void {
    this.dialogRef.close();
   
  }
  save(){  
    const pass={name:this.name,email:this.Email,Role:this.Role,Password:this.Password};
    this.dialogRef.close(pass);

  }
  selectChangeHandler (event: any) {
   
    this.Role = event.target.value;
   
    
  }
}

