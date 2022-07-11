import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToDoListComponent } from './to-do-list.component';
import { ToDoListItemModule } from '../to-do-list-item/to-do-list-item.module';
import { RouterModule } from '@angular/router';
import { LetModule } from '@ngrx/component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ToDoListComponent],
  imports: [CommonModule, ToDoListItemModule, RouterModule, LetModule, TranslateModule],
})
export class ToDoListModule {}
