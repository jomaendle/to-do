import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from './header.service';
import { Observable } from 'rxjs';

export const PreferredTheme: 'light' | 'dark' = 'light';
export const PreferredThemeKey: string = 'preferredTheme';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  title$: Observable<string> = this._headerService.headerTitle$;

  isLightMode: boolean = true;

  constructor(private _translateService: TranslateService, private _headerService: HeaderService) {
    const theme = localStorage.getItem(PreferredThemeKey);
    if (theme && theme === 'light') {
      this.isLightMode = true;
      document.body.classList.remove('dark-theme');
    } else {
      this.isLightMode = false;
      document.body.classList.add('dark-theme');
    }
  }

  onThemeButtonClick(): void {
    document.body.classList.toggle('dark-theme');
    this.isLightMode = !this.isLightMode;
    localStorage.setItem(PreferredThemeKey, this.isLightMode ? 'light' : 'dark');
  }
}
