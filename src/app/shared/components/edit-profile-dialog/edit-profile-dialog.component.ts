import { AuthService } from './../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogAddComponent } from '../dialog-add/dialog-add.component';

@Component({
  selector: 'app-edit-profile-dialog',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: ['./edit-profile-dialog.component.scss'],
})
export class EditProfileDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogAddComponent>,
    private _snackBar: MatSnackBar,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    console.log("EDIT", this.data);
    
  }

  async addGrupo(){
    await this.auth.updateCurrentUser(this.data.currentUser)
    .then(() => {
      this.openSnackBar('Información actualizada','Ok','bg-success');
      this.dialogRef.close(this.data.currentUser);
    })
    .catch((e) => {
      console.error(e);
      this.openSnackBar('Oops... Algo ha fallado al intentar actualizar tu información','Ok','bg-danger');
      this.cancel();
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  openSnackBar(message: string, action: string, type: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: [type]
    });
  }

}
