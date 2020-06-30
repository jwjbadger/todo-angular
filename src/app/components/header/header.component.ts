import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TodoService } from 'src/app/services/todo-service';
import { Store } from '@ngrx/store';
import { User } from 'src/app/store/models/user.model';
import { GetUser } from 'src/app/store/actions/user.actions';

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
    private store: Store<{ user: User }>
  ) {}

  ngOnInit(): void {}

  deleteAll() {
    this.emitDeleteAll.emit();
  }
  login(name: string, pass: string) {
    this.todoService.login(name, pass).then((data) => {
      this.todoService
        .getTodos()
        .toPromise()
        .then((user) => {
          this.store.dispatch(GetUser({ payload: user }));
        });
    });
  }
  register(name: string, pass: string) {
    this.todoService.register(name, pass).then((data) => {
      this.todoService
        .getTodos()
        .toPromise()
        .then((user) => {
          this.store.dispatch(GetUser({ payload: user }));
        });
    });
  }
}
