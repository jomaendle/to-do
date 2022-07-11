import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from './header.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  title$: Observable<string> = this._headerService.headerTitle$;

  isLightMode: boolean = true;

  constructor(private _translateService: TranslateService, private _headerService: HeaderService) {}

  onThemeButtonClick(): void {
    document.body.classList.toggle('dark-theme');
    this.isLightMode = !this.isLightMode;
  }
}
