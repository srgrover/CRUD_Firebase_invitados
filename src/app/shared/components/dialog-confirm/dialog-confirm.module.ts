import { MatButtonModule } from '@angular/material/button';
import { DialogConfirmComponent } from './dialog-confirm.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [DialogConfirmComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule
  ],
  exports: [DialogConfirmComponent]
})
export class DialogConfirmModule { }
