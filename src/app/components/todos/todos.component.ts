import { Component, OnInit } from '@angular/core';
import { User } from '../../store/models/user.model';
import { TodoService } from '../../services/todo-service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import {
  GetUser,
  AddTask,
  RemoveAll,
} from 'src/app/store/actions/user.actions';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  user$: Observable<User>;
  user: User;

  constructor(
    private todoService: TodoService,
    private store: Store<{ user: User }>
  ) {
    this.todoService
      .getTodos()
      .toPromise()
      .then((user) => {
        this.store.dispatch(GetUser({ payload: user }));
        this.user$ = this.store.select((state) => state.user);
        this.user$.subscribe((store) => {
          this.user = store;
        });
      });
  }

  ngOnInit(): void {}
  createNew(title: string, description: string) {
    this.store.dispatch(
      AddTask({ payload: { title: title, description: description } })
    );
    this.todoService.patch(this.user).subscribe();
  }
  deleteAll() {
    this.store.dispatch(RemoveAll());
    this.todoService.patch(this.user).subscribe();
  }
}
