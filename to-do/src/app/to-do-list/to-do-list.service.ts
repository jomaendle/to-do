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

  // todo add endpoint to update item position in one request
  updateItemPosition(item: ToDoItem, newPosition: number): Observable<string> {
    return this.toDoItems$.pipe(
      take(1),
      switchMap((toDoItems: ToDoItem[]) => {
        const otherItem = toDoItems.find((i: ToDoItem) => i.rank === newPosition);
        if (!otherItem) {
          return of(null);
        }

        return this._toDoService.updateToDoItem(otherItem._id || '', {
          ...otherItem,
          _id: undefined,
          rank: item.rank,
        });
      }),
      switchMap(() =>
        this._toDoService.updateToDoItem(item._id || '', {
          ...item,
          _id: undefined,
          rank: newPosition,
        })
      ),
      tap(() => this.refreshToDoItems())
    );
  }
}
