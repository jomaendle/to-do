import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddToDoItemComponent } from './add-to-do-item.component';
import { ToDoFormModule } from '../to-do-form/to-do-form.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AddToDoItemComponent],
  imports: [CommonModule, ToDoFormModule, HttpClientModule, RouterModule],
})
export class AddToDoItemModule {}
