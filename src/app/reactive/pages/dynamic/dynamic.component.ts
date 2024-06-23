import { Component, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'reactive-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.css']
})
export class DynamicComponent implements OnInit {

  private formBuilder = inject(FormBuilder);

  public myForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required, Validators.minLength(3)],
    favoriteGames: this.formBuilder.array([
      ['Halo', Validators.required],
      ['Gears of War', Validators.required],
      ['Forza Horizon', Validators.required]
    ])
  });

  constructor() { }

  ngOnInit() {
  }

  get favoriteGames(): FormArray {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  onSubmit(): void{
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log('Form value:', this.myForm.value);
    this.myForm.reset();
  }

}
