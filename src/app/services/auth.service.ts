import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public email:string

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private toastr: ToastrService
  ) { }

  public login(email: string, password: string) {
    this.afAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        this.router.navigate(['personal'])
        //this.updateUserData(value)
        this.email= value.user.email
        console.log('Nice, it worked!');
        console.log(value);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
        console.log(err);
        if (err.code == "auth/wrong-password") {
          this.toastr.error('Contraseña incorrecta', 'Intenta otra vez', {
            timeOut: 3000,
          });
        } else if (err.code == "auth/user-not-found") {
          this.toastr.error('Usuario no encontrado', 'Intenta otra vez', {
            timeOut: 3000,
          });
        }
      });
  }
  // public login (email:string, password:string) {
  //   return this.afAuth.auth.signInWithEmailAndPassword(email,password)
  //     .catch(this.handleError)
  // }
  public logout () {
    return this.afAuth.auth.signOut();
  } 
  private handleError(error: Response | any) {
    // console.error('handleError',error);
    console.error('handleError', error.message || error);
    return error.code
  }
}
