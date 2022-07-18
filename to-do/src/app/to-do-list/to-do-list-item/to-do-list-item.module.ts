import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToDoListItemComponent } from './to-do-list-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownButtonModule } from '../../shared/dropdown-button/dropdown-button.module';

@NgModule({
  declarations: [ToDoListItemComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule, DropdownButtonModule],
  exports: [ToDoListItemComponent],
})
export class ToDoListItemModule {}
