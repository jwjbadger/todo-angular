import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo-item.model';
import { User } from '../../models/user.model';
import { TodoService } from '../../services/todo-service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  todos: Todo[];
  user: User;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((user) => {
      this.todos = user.todos;
      this.user = user;
    });
  }
}
