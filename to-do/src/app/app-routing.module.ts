import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { AddToDoItemComponent } from './to-do-form/add-to-do-item/add-to-do-item.component';
import { EditToDoItemComponent } from './to-do-form/edit-to-do-item/edit-to-do-item.component';

const routes: Routes = [
  { path: '', redirectTo: 'items', pathMatch: 'full' },
  {
    path: 'items',
    component: ToDoListComponent,
  },
  {
    path: 'items/new',
    component: AddToDoItemComponent,
  },
  {
    path: 'items/edit/:id',
    component: EditToDoItemComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
