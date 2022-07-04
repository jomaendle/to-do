import { Component, OnInit } from '@angular/core';
import { ToDoItem } from '../to-do-item';
import { ToDoService } from '../to-do.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-to-do-item',
  templateUrl: './add-to-do-item.component.html',
  styleUrls: ['./add-to-do-item.component.scss'],
})
export class AddToDoItemComponent implements OnInit {
  constructor(private _toDoService: ToDoService, private _router: Router) {}

  ngOnInit(): void {}

  onFormSubmit(toDoItem: ToDoItem): void {
    this._toDoService.createToDoItem(toDoItem).subscribe(() => {
      console.log('ToDoItem created');
      this._router.navigate(['/items']);
    });
  }
}
