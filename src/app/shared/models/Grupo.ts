import { Persona } from 'src/app/shared/models/Persona';
export interface Grupo {
  id?: string;
  descripcion: string;
  persona?: Persona[];
  rechazado: boolean;
}
