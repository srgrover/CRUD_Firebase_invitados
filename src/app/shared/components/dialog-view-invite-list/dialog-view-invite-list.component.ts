import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NavigationExtras, Router } from '@angular/router';
import { Persona } from '../../models/Persona';
import { DialogAddComponent } from '../dialog-add/dialog-add.component';

@Component({
  selector: 'app-dialog-view-invite-list',
  templateUrl: './dialog-view-invite-list.component.html',
  styleUrls: ['./dialog-view-invite-list.component.scss']
})
export class DialogViewInviteListComponent implements OnInit {

  navExtras: NavigationExtras = {
    state: {
      persona: null
    }
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private router: Router, public dialogRef: MatDialogRef<DialogAddComponent>,) { }

  ngOnInit(): void {
  }

  selectPerson(persona: Persona){
    this.dialogRef.close(persona);
  }
}
