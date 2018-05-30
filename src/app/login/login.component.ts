import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userForm: FormGroup;
  email: string;
  password: string;

  constructor(
    private auth: AuthService, 
    @Inject(FormBuilder) private fb: FormBuilder, 
    private router: Router, 
    private toastr: ToastrService ) { }

  login(): void {
    this.auth.login(this.email, this.password)
      // .then(value => {
      //   console.log(value);
      //   if (value == "auth/wrong-password") {
      //     this.toastr.error('Contraseña incorrecta', 'Intenta otra vez', {
      //       timeOut: 3000,
      //     });
      //   } else if (value == "auth/user-not-found") {
      //     this.toastr.error('Usuario no encontrado', 'Intenta otra vez', {
      //       timeOut: 3000,
      //     });
      //   } else if (value.operationType == 'signIn') {
      //     this.router.navigate(['personal'])
      //     this.toastr.success('Ingreso Correcto', 'Bienvenido', {
      //       timeOut: 3000,
      //     });
      //   }
      // })
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    this.userForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
      ]
      ],
      'password': ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(25)
      ]
      ],
    });

    this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  formErrors = {
    'email': '',
    'password': ''
  };

  validationMessages = {
    'email': {
      'required': 'Este campoes obligatorio',
      'pattern': 'Ingrese un email válido'
    },
    'password': {
      'required': 'Este campo es obligatorio',
      'minlength': 'Debe tener 6 caracteres como mínimo',
      'maxlength': 'La contraseña no puede exceder los 40 caracteres',
    }
  };

  // Updates validation state on form changes.
  onValueChanged(data?: any) {
    if (!this.userForm) { return; }
    const form = this.userForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.invalid && control.dirty) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

}
