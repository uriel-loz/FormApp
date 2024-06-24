import { Component, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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

  public newFavorite: FormControl = new FormControl('', [Validators.required]);

  constructor() { }

  ngOnInit() {
  }

  get favoriteGames(): FormArray {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  isValidField(field: string): boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }

  isValidFieldArray(formArray: FormArray, index: number) {
    return formArray.controls[index].errors
      && formArray.controls[index].touched;
  }

  getFieldError(field: string): string | null{
    if(!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      if (key === 'required') 
        return 'Este campo es requerido';
      
      if (key === 'minlength')
        return `Mínimo ${errors[key].requiredLength} caracteres.`;
    }

    return '';
  }

  onAddFavorites(): void {
    if(this.newFavorite.invalid) return;

    const newGame = this.newFavorite.value;

    this.favoriteGames.push(
      this.formBuilder.control(newGame, Validators.required)
    );

    this.newFavorite.reset();
  }

  onDeleteFavorite(index: number): void {
    this.favoriteGames.removeAt(index);
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
