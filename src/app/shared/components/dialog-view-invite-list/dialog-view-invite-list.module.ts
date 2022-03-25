import { DialogViewInviteListComponent } from './dialog-view-invite-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [DialogViewInviteListComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatListModule
  ],
  exports: [DialogViewInviteListComponent]
})
export class DialogViewInviteListModule { }
