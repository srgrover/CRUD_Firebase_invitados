import { AuthService } from './../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogAddComponent } from '../dialog-add/dialog-add.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-profile-dialog',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: ['./edit-profile-dialog.component.scss'],
})

export class EditProfileDialogComponent implements OnInit {
  public infoForm!: FormGroup;
  public srcImage: string | null = null;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogAddComponent>,
    private _snackBar: MatSnackBar,
    private auth: AuthService,
    private fb: FormBuilder
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    console.log("EDIT", this.data);
    this.srcImage = this.data.currentUser.photoURL;
  }

  private initForm(): void {
    this.infoForm = this.fb.group({
      displayName: [this.data.currentUser.displayName],
      photoURL: [this.data.currentUser.photoURL],
    });
  }

  async updateInfo(){
    await this.auth.updateCurrentUser(this.infoForm.value)
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

  onChangeURL(e: any){
    console.log("🚀 ~ file: edit-profile-dialog.component.ts ~ line 65 ~ EditProfileDialogComponent ~ onChangeURL ~ e", e)
    this.srcImage = e.target.value;
    console.log("🚀 ~ file: edit-profile-dialog.component.ts ~ line 67 ~ EditProfileDialogComponent ~ onChangeURL ~ his.srcImage", this.srcImage)
  }
}
