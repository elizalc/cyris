import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, FormGroup, Validators, FormArray } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { ActivatedRoute, Router, ParamMap  } from "@angular/router";
import { PersonalService } from "../../services/personal.service";

@Component({
  selector: 'app-personal-edit',
  templateUrl: './personal-edit.component.html',
  styleUrls: ['./personal-edit.component.css']
})
export class PersonalEditComponent implements OnInit {

  public personalForm: FormGroup
  public id: number
  public personal: Object

  constructor(
    private fb: FormBuilder,
    private pes: PersonalService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id= params['id']
    });
    this.pes.loadPersonal(this.id)
    .subscribe(
      data =>{
        this.personal = data
        console.log(this.personal)
        this.personalForm.setValue(
          this.personal
        )
      }
    )
    this.buildForm()
  
  }
 
  editPersonal(): void {
    //const newObject = Object.assign({}, this.personal, this.personalForm.value );
    this.pes.editPersonal(this.personalForm.value,this.id)
      .subscribe(
        data=> console.log(data)
      )  
  }

  //construye el formulario
  buildForm(): void {
    
    this.personalForm = this.fb.group({
      'id': ['', [
        Validators.pattern('^[0-9]*$')
      ]],
      'nombre': ['', [
        Validators.pattern('^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1])[a-zA-ZÀ-ÿ\u00f1\u00d1]+$')
      ]],
      'nombre2': ['', [
        Validators.pattern('^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1])[a-zA-ZÀ-ÿ\u00f1\u00d1]+$')
      ]],
      'paterno': ['', [

      ]],
      'materno': ['', [
      ]],
      'nroDNI': ['', [
        Validators.pattern('^[0-9]*$')
      ]],
      'vigenciaDNI': ['', [

      ]],
      'nroRuc': ['', [
        Validators.pattern('^[0-9]*$'),
        Validators.maxLength(11)
      ]],
      'nroPasaporte': ['', [
        Validators.pattern('^[0-9]*$'),
        Validators.maxLength(15)
      ]],
      'vigenciaPasaporte': ['', [
      ]],
      'estadoCivil': ['', [

        Validators.maxLength(20)
      ]],
      'sexo': ['', [

        Validators.maxLength(9)
      ]],
      'fechaNacimiento': ['', [

      ]],
      'celular': ['', [
        Validators.maxLength(11)
      ]],
      'celularTrab': ['', [
        Validators.maxLength(11)
      ]],
      'fijo': ['', [
        Validators.maxLength(11)
      ]],
      'telefonoRef': ['', [
        Validators.maxLength(11)
      ]],
      'fijoTran': ['', [
        Validators.maxLength(11)
      ]],
      'anexo': ['', [
        Validators.maxLength(6)
      ]],
      'email': ['', [
        Validators.email,
        Validators.maxLength(30)
      ]],
      'emailTrab': ['', [
        Validators.email,
        Validators.maxLength(30)
      ]],
      'web': ['', [
        Validators.maxLength(40)
      ]],
      'nroLicencia': ['', [
        Validators.pattern('^[0-9]*$')
      ]],
      'vigenciaLicencia': ['', [

      ]],
      'catLicencia': ['', [
        Validators.maxLength(3)
      ]],
      'codSalud': ['', [
        Validators.pattern('^[0-9]*$')
      ]],
      'fondoPension': ['', [
        Validators.maxLength(3)
      ]],
      'tipoAfp': ['', [
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
      'grupoSangre': ['', [
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
    'id': '',
    'nombre': '',
    'nombre2': '',
    'paterno': '',
    'materno': '',
    'nroDNI': '',
    'vigenciaDNI': '',
    'nroRUC': '',
    'nroPasaporte': '',
    'vigenciaPasaporte': '',
    'estadoCivil': '',
    'sexo': '',
    'fechaNacimiento': '',
    'celular': '',
    'celularTrab': '',
    'fijo': '',
    'telefonoRef': '',
    'fijoTrab': '',
    'anexo': '',
    'email': '',
    'emailTrab': '',
    'web': '',
    'nroLicencia': '',
    'vigenciaLicencia': '',
    'catLicencia': '',
    'codSalud': '',
    'fondoPension': '',
    'tipoAfp': '',
    'cuspp': '',
    'profesion': '',
    'peso': '',
    'talla': '',
    'contextura': '',
    'grupoSangre': '',
    'foto': ''
  };

  validationMessages = {
    'id': {
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
    'nroDNI': {
      'pattern': 'Ingrese un número válido',
      'required': 'Este campo es obligatorio'
    },
    'vigenciaDNI': {
      'required': 'Este campo es obligatorio',
    },
    'nroRuc': {
      'pattern': 'Ingrese un número válido'
    },
    'nroPasaporte': {
      'pattern': 'Ingrese un número válido'
    },
    'vigenciaPasaporte': {

    },
    'estadoCivil': {
      'required': 'Este campo es obligatorio',
    },
    'sexo': {
      'required': 'Este campo es obligatorio'
    },
    'fechaNacimiento': {
      'required': 'Este campo es obligatorio'
    },
    'celular': {
      'maxLength': 'Puede tener hasta 9 dígitos'
    },
    'celularTrab': {
      'maxLength': 'Puede tener hasta 9 dígitos'
    },
    'fijo': {
      'maxLength': 'Puede tener hasta 9 dígitos'
    },
    'telefonoRef': {
      'maxLength': 'Puede tener hasta 9 dígitos'
    },
    'fijoTrab': {
      'maxLength': 'Puede tener hasta 9 dígitos'
    },
    'anexo': {
      'maxLength': 'Puede tener hasta 9 dígitos'
    },
    'email': {
      'email': 'Ingrese un email válido'
    },
    'emailTrab': {
      'email': 'Ingrese un email válido'
    },
    'web': {
      'maxLength': 'Puede tener hasta 40 carácteres'
    },
    'nroLicencia': {
      'pattern': 'Ingrese un número válido'
    },
    'vigenciaLicencia': {

    },
    'catLicencia': {
      'maxLength': 'Puede tener hasta 3 digitos'
    },
    'codSalud': {
      'pattern': 'Ingrese un número válido'
    },
    'fondoPension': {
      'maxLength': 'Puede tener hasta 3 digitos'
    },
    'tipoAfp': {
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
    'grupoSangre': {
      'maxLength': 'Puede tener hasta 3 digitos'
    },
    'foto': {

    }
  };

}
