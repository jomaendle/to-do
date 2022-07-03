import { Component, Input, OnInit } from '@angular/core';
import { ToDoItem } from '../to-do-item';

@Component({
  selector: 'app-to-do-list-item',
  templateUrl: './to-do-list-item.component.html',
  styleUrls: ['./to-do-list-item.component.scss'],
})
export class ToDoListItemComponent implements OnInit {
  @Input() toDoItem!: ToDoItem;

  constructor() {}

  ngOnInit(): void {}
}
