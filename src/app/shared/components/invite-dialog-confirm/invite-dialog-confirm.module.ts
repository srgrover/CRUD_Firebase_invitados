import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
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
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
  ],
  exports: [InviteDialogConfirmComponent]
})
export class InviteDialogConfirmModule { }
