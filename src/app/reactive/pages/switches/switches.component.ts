import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'reactive-switches',
  templateUrl: './switches.component.html',
  styleUrls: ['./switches.component.css']
})
export class SwitchesComponent implements OnInit {
  private formBuilder = inject(FormBuilder);

  public myForm:FormGroup = this.formBuilder.group({
    gender: ['M', [Validators.required]],
    wantNotifications: [true, [Validators.required]],
    termsAndConditions: [false, [Validators.requiredTrue]]
  });

  public person = {
    gender: 'F',
    wantNotifications: true
  }

  constructor() { }

  ngOnInit() {
    this.myForm.reset(this.person);
  }

  isValidField(field: string): boolean | null {
    return this.myForm.controls[field].errors
            && this.myForm.controls[field].touched;
  }

  getFieldError(field: string): string | null{
    if(!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      if (key === 'required') 
        return 'Debe de aceptar las condiciones de uso';
      
      if (key === 'minlength')
        return `Mínimo ${errors[key].requiredLength} caracteres.`;
    }

    return '';
  }

  onSave(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const {termsAndConditions, ...newPerson} = this.myForm.value;

    this.person = newPerson;
  }

}
