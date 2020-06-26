import { Component, OnInit, Input } from '@angular/core';
import { Todo } from '../../models/todo-item.model';
import { User } from '../../models/user.model';
import { TodoService } from '../../services/todo-service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  @Input() todo: Todo;
  @Input() user: User;
  @Input() index: number;

  constructor(private todoService: TodoService) {}

  public isHidden: Boolean = true;
  xPosTabMenu: Number;
  yPosTabMenu: Number;

  ngOnInit(): void {}

  hideMenu() {
    this.isHidden = true;
  }

  handleAction(event: string) {
    this.hideMenu();
    switch (event) {
      case 'toggleComplete':
        this.todo.completed = !this.todo.completed;
        this.user.todos[this.index] = this.todo;
        this.todoService.patch(this.user).subscribe();
        break;
      case 'edit':
        break;
      case 'delete':
        break;
    }
  }

  toggleMenu(event: MouseEvent) {
    event.stopPropagation();
    this.xPosTabMenu = event.clientX;
    this.yPosTabMenu = event.clientY;
    this.isHidden = !this.isHidden;

    // Keep default right click actions from happening
    return false;
  }
}
