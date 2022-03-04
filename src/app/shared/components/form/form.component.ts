import { InviteDialogConfirmComponent } from './../invite-dialog-confirm/invite-dialog-confirm.component';
import { SheetComponent } from './../sheet/sheet.component';
import { DialogConfirmComponent } from './../dialog-confirm/dialog-confirm.component';
import { DialogAddComponent } from './../dialog-add/dialog-add.component';
import { Grupo } from './../../models/Grupo';
import { DataService } from '../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Persona } from '../../models/Persona';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [DataService],
})
export class FormComponent implements OnInit {
  sexoList: any = [];
  parentescoList: any = [];
  states: any;
  stateForm: number = 0;
  sexoInvitado: string;
  clasificacion: string;
  parentescoInvitado: string;
  grupoInvitado: any;
  invitadoForm!: FormGroup;
  urlTree: any;
  persona: any;
  grupos: Grupo[] = [];
  grupoSelected: Grupo | undefined;

  panelOpenState = false;
  clasificacionList: string[];

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private _bottomSheet: MatBottomSheet
  ) {
    var navi = this.router.getCurrentNavigation();
    this.persona = navi?.extras?.state;
    this.states = { new: 1, edit: 2 };
    this.stateForm = this.getState();
    this.sexoList = ['Hombre', 'Mujer'];
    this.parentescoList = [
      'Padre',
      'Madre',
      'Hermano/a',
      'Tio/a',
      'Primo/a',
      'Abuelo/a',
      'Amigo/a',
      'Cuñado/a',
      'Otro',
    ];
    this.sexoInvitado = this.persona?.sexo || '';
    this.clasificacion = this.persona?.clasificacion || '';
    this.clasificacionList = ['Adulto', 'Joven', 'Niño'];
    this.parentescoInvitado = this.persona?.parentesco || '';
    this.grupoInvitado = this.persona?.grupo || '';
    this.initForm();
  }

  async ngOnInit(): Promise<void> {
    if (this.stateForm === this.states.edit) {
      this.invitadoForm.patchValue(this.persona);
    }

    this.patchGrupo();
  }

  async patchGrupo() {
    if (this.persona !== undefined) {
      await this.dataService.grupos.subscribe((grupos) => {
        this.grupoSelected = grupos.find((x) => x.id === this.persona.grupo);
        this.grupoInvitado = this.grupoSelected?.id;
      });
    }
  }

  async onSave(): Promise<void> {
    if (this.invitadoForm.valid) {
      try {
        const invitado: Persona = this.invitadoForm.value;

        invitado.grupo = this.grupoInvitado;
        invitado.id = this.persona?.id || null;

        if (
          (this.grupoSelected != undefined &&
            this.grupoSelected?.persona == undefined) ||
          (this.grupoSelected != undefined &&
            !Array.isArray(this.grupoSelected?.persona))
        )
          this.grupoSelected.persona = [];

        if (
          this.grupoSelected?.persona?.find((x) => x.id == invitado.id) ==
          undefined
        )
          this.grupoSelected?.persona?.push(invitado);

        await this.dataService.addInvitado(invitado);

        if (this.grupoSelected != undefined)
          await this.dataService.addGrupo(this.grupoSelected);

        if (this.stateForm == this.states.new) {
          //Swal.fire('Invitado añadido', 'Puedes verlo en la lista', 'success');
          this.openSnackBar(
            'Invitado añadido correctamente',
            'Ok',
            'bg-success'
          );
          this.invitadoForm.reset();
          this.initForm();
        } else if (this.stateForm == this.states.edit) {
          //Swal.fire('Invitado editado', 'Pulsa Ok Para volver a la lista', 'success');
          this.openSnackBar(
            'Invitado Editado correctamente',
            'Ok',
            'bg-success'
          );
          this.router.navigate(['home']);
        }

        this.invitadoForm.controls['invitado'].markAsTouched();
        this.invitadoForm.controls['confirmado'].markAsTouched();
      } catch (e) {
        console.error(e);
      }
    } else {
      //Swal.fire('Oops...', 'Comprueba los datos del formulario', 'error');
      this.openSnackBar(
        'Oops... Comprueba los datos del formulario',
        'Ok',
        'bg-danger'
      );
    }
  }

  isValidField(field: string): string {
    const validatedField = this.invitadoForm.get(field);
    return !validatedField?.valid && validatedField?.touched
      ? 'is-invalid'
      : validatedField?.touched
      ? 'is-valid'
      : '';
  }

  notRequiredHasValue(field: string): string {
    return this.invitadoForm.get(field)?.value ? 'is-valid' : '';
  }

  private initForm(): void {
    this.invitadoForm = this.fb.group({
      nombre: ['', [Validators.required]],
      apellidos: [''],
      clasificacion: ['Adulto', [Validators.required]],
      sexo: ['Hombre', [Validators.required]],
      parentesco: ['Padre', [Validators.required]],
      ubicacion: [''],
      invitado: [false, [Validators.required]],
      confirmado: [false, [Validators.required]],
      rechazado: [false, [Validators.required]],
      grupo: ['hUNpRRMnt5nL3kuz0yiK', [Validators.required]], //Id del grupo 'Sin Grupo' en firestore
    });
  }

  getState(): number {
    return this.persona && typeof (this.persona !== undefined) ? 2 : 1;
  }

  async goToDelete(id: string) {
    const dialogRefDelete = this.dialog.open(DialogConfirmComponent, {
      width: '400px',
      data: {
        title: 'Eliminar invitado',
        subtitle: '¿Seguro que quieres eliminar este invitado? Esta acción no se puede deshacer',
        isDelete: true,
        data: this.persona.nombre + " " + this.persona.apellidos,
      },
    });

    dialogRefDelete.afterClosed().subscribe(async (result) => {
      if (result) {
        try {
          await this.dataService.deleteInvitado(id);
          //Swal.fire('Invitado eliminado', 'Se ha eliminado el invitado correctamente', 'success');
          this.openSnackBar(
            'Invitado eliminado correctamente',
            'Ok',
            'bg-success'
          );
          this.router.navigate(['home']);
        } catch (err) {
          //Swal.fire('Oops...', 'Hubo un error al eliminar al invitado', 'error');
          this.openSnackBar(
            'Oops...Hubo un error al eliminar el invitado',
            'Ok',
            'bg-danger'
          );
        }
      }
    });
  }

  openSnackBar(message: string, action: string, type: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: [type],
    });
  }

  SelectGroup(gr: Grupo) {
    this.grupoSelected = gr;
    this.grupoInvitado = gr.id;
    if (this.persona != undefined) this.persona.grupo = gr.id;
  }

  async changeInvite(grupo: string, invite: boolean) {
    var invitadosGroup!: Persona[];

    this.dataService.invitados.pipe(take(1)).subscribe((invitados) => {
      invitadosGroup = invitados.filter((x) => x.grupo == grupo);

      let dialogRef = this.dialog.open(InviteDialogConfirmComponent, {
        width: '400px',
        data: { invite: invite, personas: invitadosGroup },
      });

      dialogRef
        .afterClosed()
        .pipe(take(1))
        .subscribe((result) => {
          if (result) {
            try {
              this.persona.invitado = invite;
              this.invitadoForm.controls['invitado'].setValue(invite);
              invitadosGroup.forEach(async (inviGr) => {
                try {
                  inviGr.invitado = invite;
                  await this.dataService.addInvitado(inviGr);
                } catch (e) {
                  this.openSnackBar(
                    'Oops...Hubo un error al invitar a ' +
                      inviGr.nombre +
                      ' ' +
                      inviGr.apellidos,
                    'Ok',
                    'bg-danger'
                  );
                }
              });
            } catch (err) {
              //Swal.fire('Oops...', 'Hubo un error al eliminar al invitado', 'error');
              console.error(err);
              this.openSnackBar(
                'Oops...Hubo un error al eliminar el invitado',
                'Ok',
                'bg-danger'
              );
            }
          }
        });
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddComponent, {
      width: '400px',
      data: { persona: this.persona },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.grupoSelected = result;
        this.grupoInvitado = result.id;
        if (this.persona != undefined) this.persona.grupo = result.id;
      }
    });
  }

  openBottomSheet(): void {
    const bottomSheet = this._bottomSheet.open(SheetComponent, {
      data: this.grupoSelected,
    });

    bottomSheet.afterDismissed().subscribe((result) => {
      if (result !== undefined) {
        console.log(
          '🚀 ~ file: form.component.ts ~ line 249 ~ FormComponent ~ bottomSheet.afterDismissed ~ result',
          result
        );
        this.grupoSelected = result;
        console.log(
          '🚀 ~ file: form.component.ts ~ line 253 ~ FormComponent ~ bottomSheet.afterDismissed ~ this.grupoSelected',
          this.grupoSelected
        );
        this.grupoInvitado = result.id;
        if (this.persona != undefined) this.persona.grupo = result.id;
      }
    });
  }
}
