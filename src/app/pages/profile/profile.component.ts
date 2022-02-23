import { EditProfileDialogComponent } from './../../shared/components/edit-profile-dialog/edit-profile-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public currentUser!: User | null;

  constructor(private auth: AuthService, public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser(){
    this.currentUser = this.auth.getCurrentUser();
  }

  editProfile(){
    const dialogRefDelete = this.dialog.open(EditProfileDialogComponent, {
      width: '400px',
      height: '71.5vh',
      minHeight: '71.5vh',
      data: {title: "Editar información", subtitle:"Edita tu información básica y así podrás reconocer tu cuenta mmas fácilmente. Elige un nombre para mostra y una imagen de perfil mediante URL", currentUser: this.currentUser},
    });

    dialogRefDelete.afterClosed().subscribe(async result => {
      if(result){
        /*try {
          await this.dataService.deleteInvitado(id);
          //Swal.fire('Invitado eliminado', 'Se ha eliminado el invitado correctamente', 'success');
          this.openSnackBar('Invitado eliminado correctamente','Ok','bg-success');
          this.router.navigate(['home']);
        } catch (err) {
          //Swal.fire('Oops...', 'Hubo un error al eliminar al invitado', 'error');
          this.openSnackBar('Oops...Hubo un error al eliminar el invitado','Ok','bg-danger');
        } */
      }
    });    
  }
}
