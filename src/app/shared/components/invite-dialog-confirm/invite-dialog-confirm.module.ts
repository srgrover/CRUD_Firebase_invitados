import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { InviteDialogConfirmComponent } from './invite-dialog-confirm.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [InviteDialogConfirmComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatListModule,
    MatDialogModule,
    MatIconModule
  ],
  exports: [InviteDialogConfirmComponent]
})
export class InviteDialogConfirmModule { }
