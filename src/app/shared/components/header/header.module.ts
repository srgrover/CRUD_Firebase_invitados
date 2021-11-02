import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  //exports: [HeaderComponent],
})

export class HeaderModule { }
