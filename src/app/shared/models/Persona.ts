import { Timestamp } from "firebase/firestore";

export interface Persona {
    id?: string;
    nombre: string;
    apellidos?: string;
    parentesco: string;
    sexo: string;
    ubicacion?: string;
    clasificacion: string;
    invitado: boolean;
    confirmado: boolean;
    rechazado: boolean;
    grupo: string;
    fechaCreacion: Timestamp
  }