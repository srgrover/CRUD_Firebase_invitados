import { Grupo } from './../../models/Grupo';
import { DataService } from './../../services/data.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.scss']
})

export class SheetComponent implements OnInit {
//Administración -------------------
  public debug: boolean = true;
//----------------------------------

  public grupos?: Grupo[];

  constructor(private _bottomSheetRef: MatBottomSheetRef<SheetComponent>, @Inject(MAT_BOTTOM_SHEET_DATA) public data: Grupo, private dataService: DataService) {
    this.getGrupos(); 
  }

  ngOnInit(): void {
  }

  selectGroup(grupo: Grupo): void {
    this.data = grupo;
    this._bottomSheetRef.dismiss(this.data);
  }

  async getGrupos(){
    await this.dataService.grupos.subscribe(grupos => {
      this.grupos = grupos;
      if(this.debug) console.log("🚀 Total Grupos", grupos.length)
    })
  }
}
