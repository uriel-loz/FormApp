import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveRoutingModule } from './reactive-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BasicComponent } from './pages/basic/basic.component';
import { DynamicComponent } from './pages/dynamic/dynamic.component';
import { SwitchesComponent } from './pages/switches/switches.component';


@NgModule({
  declarations: [
    BasicComponent,
    DynamicComponent,
    SwitchesComponent
  ],
  imports: [
    CommonModule,
    ReactiveRoutingModule,
    ReactiveFormsModule
  ]
})
export class ReactiveModule { }
