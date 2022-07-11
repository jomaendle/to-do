import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'to-do';

  constructor(private _translateService: TranslateService) {
    _translateService.setDefaultLang('en');
    _translateService.use('en');
  }
}
