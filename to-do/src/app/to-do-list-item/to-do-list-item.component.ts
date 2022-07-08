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
import { ToDoItem } from '../to-do-item';
import { ToDoService } from '../to-do.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, skip, switchMap, tap } from 'rxjs';

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
  @Input() isFirst!: boolean;
  @Input() isLast!: boolean;

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

  isInEditMode: boolean = false;
  private _showAnimationUp: boolean = false;
  private _showAnimationDown: boolean = false;

  get toDoItem(): ToDoItem {
    return this._toDoItem;
  }
  private _toDoItem: ToDoItem = { rank: -1, isDone: false, name: '' };

  constructor(private _toDoService: ToDoService) {}

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
  }

  onMoveItemClick(event: Event, moveUp: boolean): void {
    event.stopPropagation();
    moveUp ? (this._showAnimationUp = true) : (this._showAnimationDown = true);

    const currentRank = this._toDoItem.rank;
    const newRank = moveUp ? currentRank - 1 : currentRank + 1;

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
  }

  onSaveClick(event: Event): void {
    event.stopPropagation();
    this.isInEditMode = false;

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
