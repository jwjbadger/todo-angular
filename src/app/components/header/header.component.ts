import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TodoService } from 'src/app/services/todo-service';
import { Store } from '@ngrx/store';
import { User } from 'src/app/store/models/user.model';
import { GetUser } from 'src/app/store/actions/user.actions';

import { ToastService } from '../../services/ToastService.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() emitDeleteAll = new EventEmitter();
  info: string = undefined;

  constructor(
    private todoService: TodoService,
    private store: Store<{ user: User }>,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {}

  deleteAll() {
    this.emitDeleteAll.emit();
  }
  login(name: string, pass: string) {
    this.todoService.login(name, pass).then((data) => {
      if (data.state == 'Success') {
        this.toastService.show(
          'Success, logged in!',
          'Now make some todos...',
          'success'
        );
        this.todoService
          .getTodos()
          .toPromise()
          .then((user) => {
            this.store.dispatch(GetUser({ payload: user }));
          });
      } else {
        this.toastService.show(data.error.err, 'Sorry about that...', 'danger');
      }
    });
  }
  register(name: string, pass: string) {
    this.todoService.register(name, pass).then((data) => {
      if (data.stat == 'Success') {
        this.toastService.show(
          'Success, logged in!',
          'Now make some todos...',
          'success'
        );
        this.todoService
          .getTodos()
          .toPromise()
          .then((user) => {
            this.store.dispatch(GetUser({ payload: user }));
          });
      } else {
        this.toastService.show(data.error.err, 'Sorry about that...', 'danger');
      }
    });
  }
}
