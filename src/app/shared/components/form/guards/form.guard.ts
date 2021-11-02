import { FormComponent } from '../form.component';
import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
@Injectable()

export class FormGuard implements CanDeactivate<FormComponent> {
    canDeactivate(component: FormComponent): Observable<boolean> | Promise<boolean> | boolean {
        if(component.invitadoForm.dirty) {
            return Swal.fire({
                title: 'Estas saliendo del formulario sin guardar. ¿Estas seguro?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí'
            }).then((result) => {
                return result.isConfirmed ? true : false;
            });
        }

        return true;
    }
}