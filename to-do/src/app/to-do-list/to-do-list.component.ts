import { Component, OnInit } from '@angular/core';
import { ToDoItem } from '../to-do-item';
import { map, Observable } from 'rxjs';
import { ToDoListService } from './to-do-list.service';
import { MoveItemAction } from './to-do-list-item/to-do-list-item.component';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss'],
})
export class ToDoListComponent implements OnInit {
  toDoItems$: Observable<ToDoItem[]> = this._toDoListService.toDoItems$.pipe(
    map((toDoItems: ToDoItem[]) => (toDoItems ? toDoItems.filter((item: ToDoItem) => !!item) : [])),
    map((toDoItems: ToDoItem[]) =>
      toDoItems.sort((a: ToDoItem, b: ToDoItem) => {
        return a.rank - b.rank;
      })
    )
  );

  constructor(private _toDoListService: ToDoListService) {}

  ngOnInit(): void {}

  trackByFn(index: number, item: ToDoItem): string {
    return item._id || '';
  }

  onItemDeleted(): void {
    this._toDoListService.refreshToDoItems();
  }

  onMoveItemClick({ item, newPosition }: MoveItemAction): void {
    this._toDoListService.updateItemPosition(item, newPosition).subscribe();
  }
}
