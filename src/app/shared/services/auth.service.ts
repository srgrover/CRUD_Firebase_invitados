import { UpdateInfo } from './../models/updateInfo';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, User } from '@angular/fire/auth';
import { LoginData } from '../models/LoginData';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //public user: User | null;
  public user$: Subject<User | null>;

  constructor(public auth: Auth) {
    this.user$ = new Subject();

    //this.user = this.auth.currentUser;
  }

  login({email, password }: LoginData) {
    return signInWithEmailAndPassword(this.auth, email, password)
    .then(() => this.user$.next(this.getCurrentUser()));
  }

  register({ email, password }: LoginData) {
    return createUserWithEmailAndPassword(this.auth, email, password)
    .then(() => this.user$.next(this.getCurrentUser()));
  }

  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider())
    .then(() => this.user$.next(this.getCurrentUser()));
  }

  logout() {
    return signOut(this.auth)
    .then(() => this.user$.next(this.getCurrentUser()));
  }

  getCurrentUser(){
    return this.auth.currentUser;
  }


  isLoggedIn(){
    return this.getCurrentUser() != null;
  }

  async updateCurrentUser({displayName, photoURL}: UpdateInfo){
    var user = this.getCurrentUser();

    if(user)
      return await updateProfile(
        user, { displayName: displayName, photoURL: photoURL }
      ).catch((e) => {
        console.error(e.message)
      });
  }

  async resetPassword(email: string): Promise<any> {
    // sends reset password email
    await sendPasswordResetEmail(this.auth, email);
  }
}
