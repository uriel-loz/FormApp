import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'reactive-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit {

  // Form group
  // public myForm: FormGroup = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0),
  // });

  private formBuilder = inject(FormBuilder);
  public myForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  });

  constructor() { }

  ngOnInit(): void {
    this.myForm.reset({price: 0, inStorage: 0});
  }

  onSave(): void {
    if (this.myForm.invalid) return;

    console.log('Form value:', this.myForm.value);

    this.myForm.reset({price: 0, inStorage: 0});
  }

}
