import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class HeaderService implements OnDestroy {
  get headerTitle$(): Observable<string> {
    return this._headerTitle$.asObservable();
  }
  set headerTitle(value: string) {
    value && this._headerTitle$.next(value);
  }
  private _headerTitle$: BehaviorSubject<string> = new BehaviorSubject<string>('HEADER.TITLE');
  private _destroy$: Subject<void> = new Subject<void>();

  constructor(private _title: Title, private _translateService: TranslateService) {
    this._headerTitle$
      .pipe(
        switchMap((headerTitleKey: string) => this._translateService.get(headerTitleKey)),
        takeUntil(this._destroy$)
      )
      .subscribe((title) => this._title.setTitle(title));
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
