import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthguardService {
  user: Observable<any>;

  constructor(
    public router: Router,
    public afAuth: AngularFireAuth,
    public authService: AuthService
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.afAuth.authState
      .take(1)
      .map(authState => !!authState)
      .do(authenticated => {
        if (!authenticated) {
          this.router.navigate(['/']);
        }
      });
  }
  // canActivate() {
  //   this.user = this.afAuth.authState;
  //   this.afAuth.authState.subscribe
  //     (user => {
  //       console.log(user)
  //       if (user == null) {
  //         this.router.navigateByUrl('/');
  //         return false;
  //       }
  //     });
  //   return true;
  // }
}
