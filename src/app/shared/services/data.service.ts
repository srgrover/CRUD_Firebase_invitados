import { Injectable } from '@angular/core';
import {
  Action,
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentSnapshot,
} from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Persona } from '../models/Persona';
import { async } from '@firebase/util';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  invitados!: Observable<Persona[]>;
  private invitadoCollection!: AngularFirestoreCollection<Persona>;

  constructor(private readonly afs: AngularFirestore) {
    this.invitadoCollection = afs.collection<Persona>('personas');
    this.getInvitados();
  }

  addInvitado(invitado: Persona): Promise<void> {
    console.log("🚀 ~ file: data.service.ts ~ line 26 ~ DataService ~ invitado", invitado)
    return new Promise(async (resolve, reject) => {
      try {
        invitado.id = invitado.id || this.afs.createId();
        console.log("🚀 ~ file: data.service.ts ~ line 31 ~ DataService ~ returnnewPromise ~ invitado.id", invitado.id)
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
}
