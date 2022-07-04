import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { ToDoItem } from '../to-do-item';
import { ToDoService } from '../to-do.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, skip, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-to-do-list-item',
  templateUrl: './to-do-list-item.component.html',
  styleUrls: ['./to-do-list-item.component.scss'],
})
export class ToDoListItemComponent implements OnInit {
  @Input() toDoItem!: ToDoItem;

  @Output() toDoItemDeleted = new EventEmitter<void>();

  toDoListItemFormControl: FormControl = new FormControl(false);

  @HostListener('click')
  onClick(): void {
    this.toDoListItemFormControl.setValue(!this.toDoListItemFormControl.value);
  }

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

  onDeleteClick(): void {
    this._toDoService.deleteToDoItem(this.toDoItem._id || '').subscribe(() => {
      console.log('ToDoItem deleted');
      this.toDoItemDeleted.emit();
    });
  }
}
