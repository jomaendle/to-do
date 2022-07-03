import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToDoFormComponent } from './to-do-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ToDoFormComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [ToDoFormComponent],
})
export class ToDoFormModule {}
