import { FormGuard } from './guards/form.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './form.component';
import { ReactiveFormsModule } from '@angular/forms';

// ANGULAR MATERIAL
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';



@NgModule({
  declarations: [FormComponent],
  imports: [
    CommonModule,
    FormRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule
  ],
  providers: [FormGuard],
  exports: [FormComponent]
})
export class FormModule { }