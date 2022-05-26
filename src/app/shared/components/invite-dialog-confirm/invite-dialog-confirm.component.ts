import { OpenBy } from './../../Enum/OpenBy';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogAddComponent } from '../dialog-add/dialog-add.component';

@Component({
  selector: 'app-invite-dialog-confirm',
  templateUrl: './invite-dialog-confirm.component.html',
  styleUrls: ['./invite-dialog-confirm.component.scss']
})
export class InviteDialogConfirmComponent implements OnInit {
  //Administración -------------------
  public debug: boolean = false;
  //----------------------------------
  openBy: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DialogAddComponent>) {
    this.openBy = OpenBy;
    if(this.debug) console.log(this.openBy)
    if(this.debug) console.log(this.data)
  }

  ngOnInit(): void {
  }
}
