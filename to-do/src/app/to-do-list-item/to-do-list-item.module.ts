import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToDoListItemComponent } from './to-do-list-item.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ToDoListItemComponent],
  imports: [CommonModule, FormsModule],
  exports: [ToDoListItemComponent],
})
export class ToDoListItemModule {}
