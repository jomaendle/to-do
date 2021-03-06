import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToDoFormComponent } from './to-do-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ToDoFormComponent],
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  exports: [ToDoFormComponent],
})
export class ToDoFormModule {}
