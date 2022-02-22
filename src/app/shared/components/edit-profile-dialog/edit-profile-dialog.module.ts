import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { EditProfileDialogComponent } from './edit-profile-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [EditProfileDialogComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule
  ],
  exports: [EditProfileDialogComponent]
})
export class EditProfileDialogModule { }
