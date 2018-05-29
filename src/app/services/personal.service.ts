import { Injectable } from '@angular/core';
import { Router, Data } from "@angular/router";
import { HttpClient } from '@angular/common/http';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { Personal, PersonalList } from "../models/personal.model";
import 'rxjs/add/operator/map'

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  id: any
  private url_service = 'https://34.230.73.198:8443/v1/personas'
  private serviceUrl = 'https://cyris-data.herokuapp.com/personal'
  dataCollection: AngularFirestoreCollection<PersonalList>;
  personal: Observable<PersonalList[]>
  dataDoc: AngularFirestoreDocument<PersonalList>
  //total: AngularFirestoreCollection<Personal>
  //totalPersonal: Observable<Personal[]>
  // personal: AngularFirestoreCollection<Personal>
  personalObs: Observable<any[]>

  constructor(
    private http: HttpClient,
    private afs: AngularFirestore
  ) { 
    // this.dataCollection = this.afs.collection('datos');
    // this.data = this.dataCollection.valueChanges();
    // this.data.subscribe(
    //   data=> console.log(data)
    // )
    this.dataCollection = this.afs.collection('datos');
    this.personal = this.dataCollection.snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as PersonalList;
        console.log(data)
        const id = action.payload.doc.id;
        this.id= id
        return { id, ...data };
      });
    });
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
  public getPersonalfb(){
    // this.personalObs = this.afs.collection('datos').valueChanges()
    
    return this.personal
  }
  public getSingleItem(id){
    this.dataCollection.doc(id).ref.get().then(function (doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
      }
    })
  }
  public updateTodo(editPersonal: PersonalList) {
    this.dataCollection.doc(editPersonal.idpersona).update(editPersonal);
  }

}

