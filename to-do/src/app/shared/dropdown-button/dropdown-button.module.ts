import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownButtonComponent } from './dropdown-button.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [DropdownButtonComponent],
  exports: [DropdownButtonComponent],
  imports: [CommonModule, MatMenuModule, MatButtonModule, MatIconModule],
})
export class DropdownButtonModule {}
