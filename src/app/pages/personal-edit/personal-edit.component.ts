import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormsModule, FormGroup, Validators, FormArray } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { ActivatedRoute, Router, ParamMap  } from "@angular/router";
import { PersonalService } from "../../services/personal.service";
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-personal-edit',
  templateUrl: './personal-edit.component.html',
  styleUrls: ['./personal-edit.component.css']
})
export class PersonalEditComponent implements OnInit {

  public personalForm: FormGroup
  public id: number
  public personal: Object
  public imagen = ''

  constructor(
    private fb: FormBuilder,
    private pes: PersonalService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id= params['id']
    });
    this.pes.loadPersonal(this.id)
    .subscribe(
      data =>{
        this.personal = data
        console.log(data)
        this.personalForm.patchValue(
          this.personal
        )
      }
    )
    this.buildForm()
  }
 
  ngAfterViewInit() {
    // $('#popoverData').popover();
    // $('.popover').popover({ trigger: "hover" });
  }

  editPersonal(): void {
    //const newObject = Object.assign({}, this.personal, this.personalForm.value );
    console.log(this.personalForm.value)
    this.pes.editPersonal(this.personalForm.value,this.id)
    .subscribe(
      data=> console.log(data)
      )  
    this.router.navigate(['/personal']);
  }

  fileChangeEvent(fileInput: any) {
    var file = fileInput.target.files;
    console.log(file);
    const fileExtension = file[0].name.substr(file[0].name.length - 3);
    if (fileExtension != "png" && fileExtension != 'jpg') {
      this.toastr.error('Contraseña incorrecta', 'Intenta otra vez', {
        timeOut: 3000,
      })
    } else {
      let size = file[0].size / 1024 / 1024;
      console.log(size);
      if (size > 5) {
        this.toastr.error('La foto supera el máximo de tamaño permitido 5MB')
      } else {
        //var user = this.user;
        var imagen = this.imagen;
        var reader = new FileReader();
        reader.onload = function (e: any) {
          $('#preview').attr('src', e.target.result);
          imagen = e.target.result;
          //user.image = e.target.result.split(',')[1];
        }
        reader.readAsDataURL(file[0]);
      }
    }
  }

  //construye el formulario
  buildForm(): void {
    this.personalForm = this.fb.group({
      'idpersona': ['', [
        Validators.pattern('^[0-9]*$')
      ]],
      'nombre': ['', [
        Validators.pattern('^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1])[a-zA-ZÀ-ÿ\u00f1\u00d1]+$')
      ]],
      'nombre2': ['', [
        Validators.pattern('^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1])[a-zA-ZÀ-ÿ\u00f1\u00d1]+$')
      ]],
      'paterno': ['', [
        Validators.pattern('^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1])[a-zA-ZÀ-ÿ\u00f1\u00d1]+$')

      ]],
      'materno': ['', [
        Validators.pattern('^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1])[a-zA-ZÀ-ÿ\u00f1\u00d1]+$')
      ]],
      'nrodni': ['', [
        Validators.pattern('^[0-9]*$')
      ]],
      'vigenciadni': ['', [

      ]],
      'nroruc': ['', [
        Validators.pattern('^[0-9]*$'),
        Validators.maxLength(11)
      ]],
      'nropasaporte': ['', [
        Validators.pattern('^[0-9]*$'),
        Validators.maxLength(15)
      ]],
      'vigenciapasaporte': ['', [
      ]],
      'estadocivil': ['', [
        Validators.maxLength(20)
      ]],
      'sexo': ['', [
        Validators.maxLength(9)
      ]],
      'fechanacimiento': ['', [

      ]],
      'celular': ['', [
        Validators.maxLength(11)
      ]],
      'celulartrab': ['', [
        Validators.maxLength(11)
      ]],
      'fijo': ['', [
        Validators.maxLength(11)
      ]],
      'telefonoref': ['', [
        Validators.maxLength(11)
      ]],
      'fijotrab': ['', [
        Validators.maxLength(11)
      ]],
      'anexo': ['', [
        Validators.maxLength(6)
      ]],
      'email': ['', [
        Validators.email,
        Validators.maxLength(30)
      ]],
      'emailtrab': ['', [
        Validators.email,
        Validators.maxLength(30)
      ]],
      'web': ['', [
        Validators.maxLength(40)
      ]],
      'nrolicencia': ['', [
        Validators.pattern('^[0-9]*$')
      ]],
      'vigencialicencia': ['', [

      ]],
      'catlicencia': ['', [
        Validators.maxLength(3)
      ]],
      'codsalud': ['', [
        Validators.pattern('^[0-9]*$')
      ]],
      'fondopension': ['', [
        Validators.maxLength(3)
      ]],
      'tipoafp': ['', [
        Validators.maxLength(3)
      ]],
      'cuspp': ['', [
        Validators.pattern('^[0-9]*$')
      ]],
      'profesion': ['', [
        Validators.maxLength(30)
      ]],
      'peso': ['', [

      ]],
      'talla': ['', [

      ]],
      'contextura': ['', [
        Validators.maxLength(15)
      ]],
      'gruposangre': ['', [
        Validators.maxLength(15)
      ]],
      'foto': ['', [

      ]]
    });

    this.personalForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // reset validation messages
  }

  // Updates validation state on form changes.
  onValueChanged(data?: any) {
    if (!this.personalForm) { return; }
    const form = this.personalForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = {
    'idpersona': '',
    'nombre': '',
    'nombre2': '',
    'paterno': '',
    'materno': '',
    'nrodni': '',
    'vigenciadni': '',
    'nroruc': '',
    'nropasaporte': '',
    'vigenciapasaporte': '',
    'estadocivil': '',
    'sexo': '',
    'fechanacimiento': '',
    'celular': '',
    'celulartrab': '',
    'fijo': '',
    'telefonoref': '',
    'fijotrab': '',
    'anexo': '',
    'email': '',
    'emailtrab': '',
    'web': '',
    'nrolicencia': '',
    'vigencialicencia': '',
    'catlicencia': '',
    'codsalud': '',
    'fondopension': '',
    'tipoafp': '',
    'cuspp': '',
    'profesion': '',
    'peso': '',
    'talla': '',
    'contextura': '',
    'gruposangre': '',
    'foto': ''
  };

  validationMessages = {
    'idpersona': {
      'required': 'Este campo es obligatorio',
      'pattern': 'Solo números'
    },
    'nombre': {
      'required': 'Este campo es obligatorio',
      'pattern': 'Ingresa un nombre válido'
    },
    'nombre2': {
      'pattern': 'Ingresa un nombre válido'
    },
    'paterno': {
      'required': 'Este campo es obligatorio',
      'pattern': 'Ingresa un apellido válido'
    },
    'materno': {
      'required': 'Este campo es obligatorio',
      'pattern': 'Ingrese un apellido válido'
    },
    'nrodni': {
      'pattern': 'Ingrese un número válido',
      'required': 'Este campo es obligatorio'
    },
    'vigenciadni': {
      'required': 'Este campo es obligatorio',
    },
    'nroruc': {
      'pattern': 'Ingrese un número válido'
    },
    'nropasaporte': {
      'pattern': 'Ingrese un número válido'
    },
    'vigenciapasaporte': {

    },
    'estadocivil': {
      'required': 'Este campo es obligatorio',
    },
    'sexo': {
      'required': 'Este campo es obligatorio'
    },
    'fechanacimiento': {
      'required': 'Este campo es obligatorio'
    },
    'celular': {
      'maxLength': 'Puede tener hasta 9 dígitos'
    },
    'celulartrab': {
      'maxLength': 'Puede tener hasta 9 dígitos'
    },
    'fijo': {
      'maxLength': 'Puede tener hasta 9 dígitos'
    },
    'telefonoref': {
      'maxLength': 'Puede tener hasta 9 dígitos'
    },
    'fijotrab': {
      'maxLength': 'Puede tener hasta 9 dígitos'
    },
    'anexo': {
      'maxLength': 'Puede tener hasta 9 dígitos'
    },
    'email': {
      'email': 'Ingrese un email válido'
    },
    'emailtrab': {
      'email': 'Ingrese un email válido'
    },
    'web': {
      'maxLength': 'Puede tener hasta 40 carácteres'
    },
    'nrolicencia': {
      'pattern': 'Ingrese un número válido'
    },
    'vigencialicencia': {

    },
    'catlicencia': {
      'maxLength': 'Puede tener hasta 3 digitos'
    },
    'codsalud': {
      'pattern': 'Ingrese un número válido'
    },
    'fondopension': {
      'maxLength': 'Puede tener hasta 3 digitos'
    },
    'tipoafp': {
      'maxLength': 'Puede tener hasta 3 digitos'
    },
    'cuspp': {
      'pattern': 'Ingrese un número válido'
    },
    'profesion': {
      'maxLength': 'Puede tener hata 30 digitos'
    },
    'peso': {

    },
    'talla': {

    },
    'contextura': {
      'maxLength': 'Puede tener hasta 15 digitos'
    },
    'gruposangre': {
      'maxLength': 'Puede tener hasta 3 digitos'
    },
    'foto': {

    }
  };

}
