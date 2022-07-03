import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddToDoItemComponent } from './add-to-do-item.component';
import { ToDoFormModule } from '../to-do-form/to-do-form.module';

@NgModule({
  declarations: [AddToDoItemComponent],
  imports: [CommonModule, ToDoFormModule],
})
export class AddToDoItemModule {}
