import { DataService } from '../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Persona } from '../../models/Persona';

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
  stateForm: number = 0
  sexoInvitado: string;
  parentescoInvitado: string;
  invitadoForm!: FormGroup;
  urlTree: any;
  persona: any;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private router: Router
  ) {
    var navi = this.router.getCurrentNavigation();
    this.persona = navi?.extras?.state;
    console.log("🚀 ~ file: form.component.ts ~ line 32 ~ FormComponent ~ this.persona", this.persona)
    this.states = { new: 1, edit: 2 };
    this.stateForm = this.getState();
    this.sexoList = ["Hombre", "Mujer"];
    this.parentescoList = ["Padre", "Madre", "Hermano/a", "Tio/a", "Primo/a", "Abuelo/a", "Amigo/a", "Otro"];

    this.sexoInvitado = this.persona?.sexo || "";
    this.parentescoInvitado = this.persona?.parentesco || "";

    this.initForm();
  }

  ngOnInit(): void {
    if(this.stateForm === this.states.edit){
      this.invitadoForm.patchValue(this.persona);
    }
  }

  async onSave(): Promise<void> {
    if (this.invitadoForm.valid) {
      try {
        const invitado: Persona = this.invitadoForm.value;
        invitado.id = this.persona?.id || null
        await this.dataService.addInvitado(invitado);

        if(this.stateForm == this.states.new){          
          Swal.fire('Invitado añadido', 'Puedes verlo en la lista', 'success');
          this.invitadoForm.reset();
        } else if(this.stateForm == this.states.edit){
          Swal.fire('Invitado editado', 'Pulsa Ok Para volver a la lista', 'success');
          this.router.navigate(['home']);
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      Swal.fire('Oops...', 'Comprueba los datos del formulario', 'error');
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
      sexo: ['Hombre', [Validators.required]],
      parentesco: ['', [Validators.required]],
      ubicacion: ['', [Validators.required]],
      invitado: [false, [Validators.required]],
      confirmado: [false, [Validators.required]],
    });
  }

  getState(): number {    
    return this.persona && typeof(this.persona !== undefined) ? 2 : 1;
  }

  goBack(){
    this.router.navigate(['home']);
  }

  async goToDelete(id: string){
    console.log("🚀 ~ file: form.component.ts ~ line 105 ~ FormComponent ~ goToDelete ~ id", id)
    try {
      await this.dataService.deleteInvitado(id);
      Swal.fire('Invitado eliminado', 'Se ha eliminado el invitado correctamente', 'success');
      this.router.navigate(['home']);
    } catch (err) {
      Swal.fire('Oops...', 'Hubo un error al eliminar al invitado', 'error');
    }
    
  }
}
