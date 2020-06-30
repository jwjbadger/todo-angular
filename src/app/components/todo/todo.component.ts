import { Component, OnInit, Input } from '@angular/core';
import { Todo } from '../../store/models/todo-item.model';
import { User } from '../../store/models/user.model';
import { TodoService } from '../../services/todo-service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  ToggleComplete,
  RemoveTask,
  EditTask,
} from 'src/app/store/actions/user.actions';
import { ToastService } from 'src/app/services/ToastService.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  @Input() todo: Todo;

  user$: Observable<User>;
  index: number;
  user: User;

  constructor(
    private todoService: TodoService,
    private store: Store<{ user: User }>,
    private toastService: ToastService
  ) {}

  public isHidden: Boolean = true;
  xPosTabMenu: Number;
  yPosTabMenu: Number;

  inputEnabled: Boolean = false;

  ngOnInit(): void {
    this.user$ = this.store.select((state) => state.user);
    this.user$.subscribe((store) => {
      this.user = store;
      this.index = this.user.todos ? this.user.todos.indexOf(this.todo) : -1;
    });
  }

  hideMenu() {
    this.isHidden = true;
  }

  handleAction(event: string) {
    this.hideMenu();
    switch (event) {
      case 'toggleComplete':
        this.store.dispatch(ToggleComplete({ payload: this.index }));
        this.todoService.patch(this.user).subscribe();

        if (!this.todo.completed) {
          this.toastService.show(
            'Great job!',
            'Keep up with the good work',
            'success'
          );
        } else {
          this.toastService.show(
            'Good job coming back to this',
            'Hopefully this is the last time though',
            'success'
          );
        }
        break;
      case 'edit':
        this.inputEnabled = true;
        this.toastService.show(
          'Edit away',
          'Your tasks get better every time',
          'success'
        );
        break;
      case 'delete':
        console.log(this.index);
        this.store.dispatch(RemoveTask({ payload: this.index }));
        this.todoService.patch(this.user).subscribe();
        this.toastService.show(
          'Task deleted',
          'I guess this is a success message?',
          'success'
        );
        break;
    }
  }

  finishEdit(title: string, description: string) {
    this.inputEnabled = false;

    this.store.dispatch(
      EditTask({
        payload: { title: title, description: description, index: this.index },
      })
    );

    this.todoService.patch(this.user).subscribe();
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
