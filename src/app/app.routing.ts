import { Routes } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { LayoutComponent } from "./layouts/layout.component";

import { StaffInformationComponent } from "./pages/staff-information/staff-information.component";
import { NewPersonalComponent } from "./pages/new-personal/new-personal.component";
import { PersonalEditComponent } from "./pages/personal-edit/personal-edit.component";

import { AuthguardService } from "./services/authguard.service";
export const AppRoutes: Routes =[
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    "path": "",
    "component": LayoutComponent,
    "canActivate": [AuthguardService],
    "children": [
      {
        path: "personal",
        component: StaffInformationComponent
      },
      {
        path: "nuevo-personal",
        component: NewPersonalComponent
      },
      {
        path: "personal/editar/:id",
        component: PersonalEditComponent
      }
    ]
  }
]