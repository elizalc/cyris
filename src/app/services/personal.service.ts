import { Injectable } from '@angular/core';
import { Router, Data } from "@angular/router";
import { HttpClient } from '@angular/common/http';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { Personal, PersonalList } from "../models/personal.model";

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  private url_service = 'https://34.230.73.198:8443/v1/personas'
  private serviceUrl = 'https://cyris-data.herokuapp.com/personal'
  dataCollection: AngularFirestoreCollection<PersonalList>;
  data: Observable<PersonalList[]>
  dataDoc: AngularFirestoreDocument<PersonalList>
  //total: AngularFirestoreCollection<Personal>
  //totalPersonal: Observable<Personal[]>

  constructor(
    private http: HttpClient,
    private db: AngularFirestore
  ) { 
    this.dataCollection = this.db.collection('datos');
    this.data = this.dataCollection.valueChanges();
    this.data.subscribe(
      data=> console.log(data)
    )

  }

  public getPersonal(): Observable<Personal[]> {
    return this.http.get<Personal[]>(this.url_service)
  }
  public addPersonal(newPersonal: PersonalList): Observable<PersonalList[]>{
    return this.http.post<PersonalList[]>(this.url_service, newPersonal)
  }
  public editPersonal(editPersonal: PersonalList, id): Observable<PersonalList[]>{
    return this.http.put<PersonalList[]>(this.url_service,editPersonal)
  }
  public loadPersonal(id): Observable<PersonalList[]>{
    return this.http.get<PersonalList[]>(this.url_service + '/' + id)
  }
  public deletePersonal(id){
    return this.http.delete(this.url_service + '/' + id)
  }
  private handleError(error: Response | any) {
    // console.error('handleError',error);
    console.error('handleError', error.message || error);
    return error
  }

  public addPersonalfb(newPersonal: PersonalList){
    this.dataCollection.add(newPersonal);
  }
}

