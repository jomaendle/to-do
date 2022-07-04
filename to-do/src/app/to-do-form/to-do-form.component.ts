import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToDoItem } from '../to-do-item';

@Component({
  selector: 'app-to-do-form',
  templateUrl: './to-do-form.component.html',
  styleUrls: ['./to-do-form.component.scss'],
})
export class ToDoFormComponent implements OnInit {
  @Input() toDoItem!: ToDoItem;

  @Output() formSubmitted = new EventEmitter<ToDoItem>();

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
    this.formSubmitted.emit({
      name: this.formGroup.get('name')?.value,
      isDone: false,
    });
  }
}
