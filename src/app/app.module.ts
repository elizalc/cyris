import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AngularFireStorage } from 'angularfire2/storage';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { LayoutModule } from "./layouts/layout.module";
import { MaterialModule } from "./material/material.module";
import { AppRoutes } from "./app.routing";
import { ModalModule } from 'ngx-bootstrap/modal';

import { OnlyNumberDirective } from './directives/only-number.directive';
import { AuthService } from "./services/auth.service";
import { PersonalService } from "./services/personal.service";
import { AuthguardService } from "./services/authguard.service";
import { StaffInformationComponent } from './pages/staff-information/staff-information.component';
import { NewPersonalComponent } from './pages/new-personal/new-personal.component';
import { PersonalEditComponent } from './pages/personal-edit/personal-edit.component';
import { ModalComponent } from './modals/deletemodal/modal.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StaffInformationComponent,
    NewPersonalComponent,
    PersonalEditComponent,
    OnlyNumberDirective,
    ModalComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    ModalModule
  ],
  providers: [AuthService, PersonalService, AuthguardService, AngularFireStorage],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalComponent,
  ]
})
export class AppModule { }
