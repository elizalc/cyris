import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { MaterialModule } from "../../material/material.module";

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {
  
  public email:string

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }
  

  ngOnInit() {
    this.email = this.auth.email
    console.log(this.email)
  }

  logout(): void {
    this.router.navigate(['login'])
    this.auth.logout()
  }

}
