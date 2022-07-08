import {
  Component,
  ElementRef,
  EventEmitter,
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

  @Input() toDoItem!: ToDoItem;
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

  isInEditMode: boolean = false;

  constructor(private _toDoService: ToDoService) {}

  ngOnInit(): void {
    this.toDoListItemFormControl.valueChanges
      .pipe(
        skip(1),
        distinctUntilChanged(),
        debounceTime(500),
        tap((isDone: boolean) => console.log(isDone)),
        switchMap((isDone: boolean) =>
          this._toDoService.updateToDoItem(this.toDoItem._id || '', {
            ...this.toDoItem,
            isDone,
            _id: undefined,
          })
        )
      )
      .subscribe((response) => {
        console.log(response);
      });

    if (this.toDoItem) {
      this.toDoListItemFormControl.setValue(this.toDoItem.isDone);
    }
  }

  onMoveItemClick(event: Event, moveUp: boolean): void {
    event.stopPropagation();
    const currentRank = this.toDoItem.rank;
    const newRank = moveUp ? currentRank - 1 : currentRank + 1;
    this.moveItemClick.emit({
      item: this.toDoItem,
      newPosition: newRank,
    });
  }

  onEditClick(event: Event): void {
    event.stopPropagation();
    this.isInEditMode = true;
  }

  onSaveClick(event: Event): void {
    event.stopPropagation();
    this.isInEditMode = false;

    this._toDoService
      .updateToDoItem(this.toDoItem._id || '', {
        ...this.toDoItem,
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

    this._toDoService.deleteToDoItem(this.toDoItem._id || '').subscribe(() => {
      console.log('ToDoItem deleted');
      this.toDoItemDeleted.emit();
    });
  }
}
