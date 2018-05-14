import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { Personal } from "../models/personal.model";

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  private serviceUrl = 'https://cyris-data.herokuapp.com/personal'
  //total: AngularFirestoreCollection<Personal>
  //totalPersonal: Observable<Personal[]>

  constructor(
    private http: HttpClient,
    private db: AngularFirestore
  ) { }

  public getPersonal(): Observable<Personal[]> {
    return this.http.get<Personal[]>(this.serviceUrl)
  }
  private handleError(error: Response | any) {
    // console.error('handleError',error);
    console.error('handleError', error.message || error);
    return error
  }
}