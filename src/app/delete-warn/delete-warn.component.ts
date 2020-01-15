

import {  MatDialogRef } from "@angular/material/dialog";
import {  Component } from "@angular/core";


@Component({
  selector: 'app-delete-warn',
  templateUrl: './delete-warn.component.html',
  styleUrls: ['./delete-warn.component.css']
})
export class DeleteWarnComponent  {
  constructor(
    public dialogRef: MatDialogRef<DeleteWarnComponent>) {}

  onNoClick(): void {
    const pass={resp:'no'};
    this.dialogRef.close(pass);
  }
  save(){
    const pass={resp:'yes'};
    this.dialogRef.close(pass);
  }
}
