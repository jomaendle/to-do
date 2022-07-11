import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageSwitchComponent } from './language-switch.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [LanguageSwitchComponent],
  exports: [LanguageSwitchComponent],
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
})
export class LanguageSwitchModule {}
