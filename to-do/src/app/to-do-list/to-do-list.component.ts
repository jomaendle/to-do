import { Component, OnInit } from '@angular/core';
import { ToDoItem } from '../to-do-item';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss'],
})
export class ToDoListComponent implements OnInit {
  toDoItems: ToDoItem[] = [
    {
      isDone: false,
      name: 'Buy milk 🥛',
    },
    {
      isDone: false,
      name: 'Call airport for refund ',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
