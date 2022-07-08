import { Injectable } from '@angular/core';
import { ToDoService } from '../to-do.service';
import { Observable, of, startWith, Subject, switchMap, take, tap } from 'rxjs';
import { ToDoItem } from '../to-do-item';

@Injectable({
  providedIn: 'root',
})
export class ToDoListService {
  toDoItems$: Observable<ToDoItem[]>;

  private _refresh$: Subject<void> = new Subject<void>();

  constructor(private _toDoService: ToDoService) {
    this.toDoItems$ = this._refresh$.pipe(
      startWith(''),
      switchMap(() => this._toDoService.getAllToDoItems())
    );
  }

  refreshToDoItems(): void {
    this._refresh$.next();
  }

  updateItemPosition(item: ToDoItem, newPosition: number): Observable<string> {
    return this.toDoItems$.pipe(
      take(1),
      switchMap((toDoItems: ToDoItem[]) => {
        console.log('%c here', 'color: red', toDoItems, newPosition);
        const otherItem = toDoItems.find((i: ToDoItem) => i.rank === newPosition);
        if (!otherItem) {
          return of(null);
        }
        otherItem.rank = item.rank;

        console.log(otherItem);

        return this._toDoService.updateToDoItem(otherItem._id || '', {
          ...otherItem,
          _id: undefined,
        });
      }),
      switchMap(() => {
        console.log(item);
        return this._toDoService.updateToDoItem(item._id || '', {
          ...item,
          _id: undefined,
          rank: newPosition,
        });
      }),
      tap(() => this.refreshToDoItems())
    );
  }
}
