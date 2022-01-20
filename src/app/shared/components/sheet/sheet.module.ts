import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { SheetComponent } from './sheet.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [SheetComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule
  ],
  exports: [SheetComponent]
})
export class SheetModule { }
