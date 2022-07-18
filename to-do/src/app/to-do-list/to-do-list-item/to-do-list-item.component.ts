import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ToDoItem } from '../../to-do-item';
import { ToDoService } from '../../to-do.service';
import { FormControl } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  of,
  ReplaySubject,
  skip,
  startWith,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { HeaderService } from '../../shared/header/header.service';
import { DropDownItem } from '../../shared/dropdown-button/dropdown-button.component';
import { TranslateService } from '@ngx-translate/core';
import { ThemePalette } from '@angular/material/core';

export interface MoveItemAction {
  item: ToDoItem;
  newPosition: number;
}

@Component({
  selector: 'app-to-do-list-item',
  templateUrl: './to-do-list-item.component.html',
  styleUrls: ['./to-do-list-item.component.scss'],
})
export class ToDoListItemComponent implements OnInit {
  @ViewChild('toDoValue') toDoValue!: ElementRef<HTMLSpanElement>;

  @Input()
  set toDoItem(toDoItem: ToDoItem) {
    this._showAnimationUp = false;
    this._showAnimationDown = false;
    this._toDoItem = toDoItem;
  }
  @Input()
  set isFirst(isFirst: boolean) {
    console.log(isFirst);
    this._isFirst$.next(isFirst);
  }

  @Input()
  set isLast(isLast: boolean) {
    this._isLast$.next(isLast);
  }

  @Output() toDoItemDeleted = new EventEmitter<void>();
  @Output() moveItemClick = new EventEmitter<MoveItemAction>();

  toDoListItemFormControl: FormControl = new FormControl(false);

  @HostListener('click')
  onClick(): void {
    if (!this.isInEditMode) {
      this.toDoListItemFormControl.setValue(!this.toDoListItemFormControl.value);
    }
  }

  @HostBinding('class.animation-up')
  get showAnimationUp(): boolean {
    return this._showAnimationUp;
  }

  @HostBinding('class.animation-down')
  get showAnimationDown(): boolean {
    return this._showAnimationDown;
  }

  dropdownItems: DropDownItem[] = [];

  color: ThemePalette = 'primary';
  isInEditMode: boolean = false;

  private _isFirst$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  get isFirst$(): Observable<boolean> {
    return this._isFirst$.asObservable();
  }

  private _isLast$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  get isLast$(): Observable<boolean> {
    return this._isLast$.asObservable();
  }

  private _isInEditMode$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  get isInEditMode$(): Observable<boolean> {
    return this._isInEditMode$.asObservable().pipe(startWith(false));
  }

  private _showAnimationUp: boolean = false;
  private _showAnimationDown: boolean = false;

  get toDoItem(): ToDoItem {
    return this._toDoItem;
  }
  private _toDoItem: ToDoItem = { rank: -1, isDone: false, name: '' };

  constructor(
    private _toDoService: ToDoService,
    private _headerService: HeaderService,
    private _translateService: TranslateService
  ) {
    this._headerService.headerTitle = 'HEADER.TITLE';
  }

  ngOnInit(): void {
    this.toDoListItemFormControl.valueChanges
      .pipe(
        skip(1),
        distinctUntilChanged(),
        debounceTime(500),
        tap((isDone: boolean) => console.log(isDone)),
        switchMap((isDone: boolean) =>
          this._toDoService.updateToDoItem(this._toDoItem._id || '', {
            ...this._toDoItem,
            isDone,
            _id: undefined,
          })
        )
      )
      .subscribe((response) => {
        console.log(response);
      });

    if (this._toDoItem) {
      this.toDoListItemFormControl.setValue(this._toDoItem.isDone);
    }

    this.dropdownItems = [
      {
        value$: this._translateService.get('TODO_LIST.MOVE_UP'),
        callback: (event) => {
          console.log(this.isFirst);
          this.onMoveItemClick(event, true);
        },
        disabled$: this.isFirst$,
        icon: 'move_up',
      },
      {
        value$: this._translateService.get('TODO_LIST.MOVE_DOWN'),
        callback: (event) => this.onMoveItemClick(event, false),
        disabled$: this.isLast$,
        icon: 'move_down',
      },
      {
        value$: this._translateService.get('TODO_LIST.EDIT'),
        callback: (event) => {
          console.log('edit', this.isInEditMode);
          this.onEditClick(event);
        },
        disabled$: this.isInEditMode$,
        icon: 'edit',
      },
      {
        value$: this._translateService.get('TODO_LIST.SAVE'),
        callback: (event) => this.onSaveClick(event),
        disabled$: this.isInEditMode$.pipe(map((value: boolean) => !value)),
        icon: 'save',
      },
      {
        value$: this._translateService.get('TODO_LIST.DELETE'),
        callback: (event) => this.onDeleteClick(event),
        icon: 'delete',
      },
    ];
  }

  onMoveItemClick(event: Event, moveUp: boolean): void {
    event.stopPropagation();

    const currentRank = this._toDoItem.rank;

    if (moveUp && currentRank - 1 < 0) {
      return;
    }

    moveUp ? (this._showAnimationUp = true) : (this._showAnimationDown = true);

    const newRank = moveUp ? currentRank - 1 : currentRank + 1;

    console.log('new rank', newRank);

    setTimeout(() => {
      this.moveItemClick.emit({
        item: this._toDoItem,
        newPosition: newRank,
      });
    }, 100);
  }

  onEditClick(event: Event): void {
    event.stopPropagation();
    this.isInEditMode = true;
    this._isInEditMode$.next(true);
  }

  onSaveClick(event: Event): void {
    event.stopPropagation();
    if (!this.isInEditMode) {
      return;
    }

    this.isInEditMode = false;
    this._isInEditMode$.next(false);

    this._toDoService
      .updateToDoItem(this._toDoItem._id || '', {
        ...this._toDoItem,
        name: this.toDoValue?.nativeElement.innerText || '',
        _id: undefined,
      })
      .subscribe(() => {
        console.log('ToDoItem updated');
        this.toDoItemDeleted.emit();
      });
  }

  onDeleteClick(event: Event): void {
    event.stopPropagation();

    this._toDoService.deleteToDoItem(this._toDoItem._id || '').subscribe(() => {
      console.log('ToDoItem deleted');
      this.toDoItemDeleted.emit();
    });
  }
}
