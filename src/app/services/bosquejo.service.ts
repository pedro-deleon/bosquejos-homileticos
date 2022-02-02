import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Bosquejo } from "../models/bosquejo";
import { from, map, Observable, tap } from "rxjs";
import { converSnap, converSnaps } from "../db-utils";
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class BosquejoService {

  uid: string | undefined;

  constructor(private db: AngularFirestore,
    private afAuth: AngularFireAuth) {
    this.afAuth.user.subscribe(user => this.uid = user?.uid);
  }


  cargarBosquejos(): Observable<Bosquejo[]> {
    return this.db.collection("bosquejos").get()
      .pipe(
        map(result => converSnaps<Bosquejo>(result))
      );
  }

  cargarBosquejo(id: string) {
    return this.db.doc(`/bosquejos/${id}`)
      .get()
      .pipe(
        map(result => converSnap<Bosquejo>(result))
      );

  }

  crearBosquejo(nuevoBosquejo: Partial<Bosquejo>, bosquejoId?: string) {
    let save$: Observable<any>;
    save$ = from(this.db.doc(`bosquejos/${bosquejoId}`).set(nuevoBosquejo));
    return save$
      .pipe(
        map(res => {
          return {
            id: bosquejoId ?? res.id,
            ...nuevoBosquejo
          }
        })
      )
  }


  actualizarBosquejo(bosquejoId: string, changes: Partial<Bosquejo>): Observable<any> {
    return from(this.db.doc(`bosquejos/${bosquejoId}`).update(changes));
  }


  eliminarBosquejo(bosquejoId: string) {
    return from(this.db.doc(`bosquejos/${bosquejoId}`).delete());
  }

  cargarMisBosquejos() {
    return this.db.collection("bosquejos",
      ref => ref.where("idUsuario", "==", this.uid))
      .get()
      .pipe(
        map(result => converSnaps<Bosquejo>(result))
      );
  }


  cargarBosquejosInvitado() {
    return this.db.collection("bosquejos",
      ref => ref.where("idUsuario", "==", 'admin'))
      .get()
      .pipe(
        map(result => converSnaps<Bosquejo>(result))
      );
  }

  isBosquejoFromUser(idUsuarioBosquejo: string): boolean {
    if (this.uid == idUsuarioBosquejo) {
      return true;
    } else {
      return false;
    }
  }




}
