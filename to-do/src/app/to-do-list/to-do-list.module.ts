import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToDoListComponent } from './to-do-list.component';
import { ToDoListItemModule } from '../to-do-list-item/to-do-list-item.module';

@NgModule({
  declarations: [ToDoListComponent],
  imports: [CommonModule, ToDoListItemModule],
})
export class ToDoListModule {}
