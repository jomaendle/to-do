import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

enum Language {
  'EN' = 'en',
  'DE' = 'de',
  'ES' = 'es',
}

const preferredLanguageKey: string = 'preferredLanguage';

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

  constructor(private _translateService: TranslateService) {
    const preferredLanguage: string = localStorage.getItem(preferredLanguageKey) || '';
    const typedLanguage = preferredLanguage as Language;

    if (preferredLanguage) {
      this.languageFormControl.setValue(typedLanguage);
      this._translateService.use(typedLanguage);
    }
  }

  ngOnInit(): void {
    this.languageFormControl.valueChanges.subscribe((language: Language | null) => {
      if (language) {
        this._translateService.use(language);
        localStorage.setItem(preferredLanguageKey, language);
      }
    });
  }
}
