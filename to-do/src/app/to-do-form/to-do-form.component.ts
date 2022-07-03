import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToDoItem } from '../to-do-item';

@Component({
  selector: 'app-to-do-form',
  templateUrl: './to-do-form.component.html',
  styleUrls: ['./to-do-form.component.scss'],
})
export class ToDoFormComponent implements OnInit {
  @Input() toDoItem!: ToDoItem;

  formGroup: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  constructor() {}

  ngOnInit(): void {
    if (this.toDoItem) {
      this.formGroup.setValue({
        name: this.toDoItem.name,
      });
    }
  }

  onFormSubmit(): void {
    console.log(this.formGroup.value);
  }
}
