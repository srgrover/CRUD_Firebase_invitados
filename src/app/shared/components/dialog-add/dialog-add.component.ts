import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from './../../services/data.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Grupo } from '../../models/Grupo';

@Component({
  selector: 'app-dialog-add',
  templateUrl: './dialog-add.component.html',
  styleUrls: ['./dialog-add.component.scss']
})
export class DialogAddComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Grupo,
    private dataService: DataService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
  }

  async addGrupo(){
    try {
      this.data.persona = [];
      await this.dataService.addGrupo(this.data);
      this.openSnackBar('Grupo añadido correctamente','Ok','bg-success');
      this.dialogRef.close(this.data);
    } catch (e) {
      console.error(e);
      this.openSnackBar('Oops... Algo ha fallado al intentar añadir el grupo','Ok','bg-danger')
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openSnackBar(message: string, action: string, type: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: [type]
    });
  }
}
