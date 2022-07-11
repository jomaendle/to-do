import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

enum Language {
  'EN' = 'en',
  'DE' = 'de',
  'ES' = 'es',
}

@Component({
  selector: 'app-language-switch',
  templateUrl: './language-switch.component.html',
  styleUrls: ['./language-switch.component.scss'],
})
export class LanguageSwitchComponent implements OnInit {
  get Language(): typeof Language {
    return Language;
  }

  languageFormControl = new FormControl(Language.EN, Validators.required);

  constructor(private _translateService: TranslateService) {}

  ngOnInit(): void {
    this.languageFormControl.valueChanges.subscribe((language: Language | null) => {
      language && this._translateService.use(language);
    });
  }
}
