import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo-item.model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  todos: Todo[];

  constructor() {}

  ngOnInit(): void {
    this.todos = [
      {
        id: 1,
        title: 'Groceries',
        description: 'Go get food so we can eat...',
        completed: true,
      },
      {
        id: 2,
        title: 'Stare at computer screen',
        description: 'After 10 hours, things start to make sense',
        completed: false,
      },
    ];
  }
}
