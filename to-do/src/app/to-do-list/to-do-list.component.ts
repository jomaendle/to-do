import { Component, OnInit } from '@angular/core';
import { ToDoItem } from '../to-do-item';
import { ToDoService } from '../to-do.service';
import { Observable, startWith, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss'],
})
export class ToDoListComponent implements OnInit {
  toDoItems$: Observable<ToDoItem[]>;

  private _refresh$: Subject<void> = new Subject<void>();

  constructor(private _toDoService: ToDoService) {
    this.toDoItems$ = this._refresh$.pipe(
      startWith(''),
      switchMap(() => this._toDoService.getAllToDoItems())
    );
  }

  ngOnInit(): void {}

  onItemDeleted(): void {
    this._refresh$.next();
  }
}
