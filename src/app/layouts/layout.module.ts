import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";

import { LayoutComponent } from "./layout.component";
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppFooterComponent } from './app-footer/app-footer.component';

@NgModule({
  declarations: [
    LayoutComponent,
    AppHeaderComponent,
    AppFooterComponent,
  ],
  exports: [
    LayoutComponent,
    AppHeaderComponent,
    AppFooterComponent,
  ],
  imports: [
    RouterModule,
  ]
})
export class LayoutModule {
}