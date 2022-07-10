import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToDoListModule } from './to-do-list/to-do-list.module';
import { AddToDoItemModule } from './add-to-do-item/add-to-do-item.module';

import '@angular/localize/init';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, ToDoListModule, AddToDoItemModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
