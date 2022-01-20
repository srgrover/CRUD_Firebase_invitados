import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Persona } from '../models/Persona';
import { Grupo } from '../models/Grupo';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  invitados!: Observable<Persona[]>;
  grupos!: Observable<Grupo[]>;
  private invitadoCollection!: AngularFirestoreCollection<Persona>;
  private grupoCollection!: AngularFirestoreCollection<Grupo>;

  constructor(private readonly afs: AngularFirestore) {
    this.invitadoCollection = afs.collection<Persona>('personas');
    this.grupoCollection = afs.collection<Grupo>('grupos');
    this.getGrupos();
    this.getInvitados();
  }

  addInvitado(invitado: Persona): Promise<void> {
    console.log("🚀 ~ file: data.service.ts ~ line 28 ~ DataService ~ invitado", invitado)
    return new Promise(async (resolve, reject) => {
      try {
        invitado.id = invitado.id || this.afs.createId();
        const result = await this.invitadoCollection.doc(invitado.id).set(invitado);
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  }

  private async getInvitados(): Promise<void> {
    this.invitados = await this.invitadoCollection
      .snapshotChanges()
      .pipe(
        map((actions) => actions.map((a) => a.payload.doc.data() as Persona))
      );
  }

  deleteInvitado(id: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.invitadoCollection.doc(id).delete();
        resolve(result);
      } catch (err) {
        reject(err)
      }
    });
  }

  addGrupo(grupo: Grupo): Promise<void> {
    console.log(grupo);
    
    return new Promise(async (resolve, reject) => {
      try {
        grupo.id = grupo.id || this.afs.createId();
        const result = await this.grupoCollection.doc(grupo.id).set(grupo);
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  }

  private async getGrupos(): Promise<void> {
    this.grupos = await this.grupoCollection
      .snapshotChanges()
      .pipe(
        map((actions) => actions.map((a) => a.payload.doc.data() as Grupo))
      );
  }

  deleteGrupo(id: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.grupoCollection.doc(id).delete();
        resolve(result);
      } catch (err) {
        reject(err)
      }
    });
  }
}
