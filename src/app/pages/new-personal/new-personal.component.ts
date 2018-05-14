import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-new-personal',
  templateUrl: './new-personal.component.html',
  styleUrls: ['./new-personal.component.css']
})
export class NewPersonalComponent implements OnInit {

  public personalForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnChanges() {
    this.rebuildForm();
  }
  rebuildForm() {
    this.personalForm.reset();
  }
  ngOnInit() {
    this.buildForm();
  }
  buildForm(): void {
    
  }

}
