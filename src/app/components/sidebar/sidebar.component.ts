import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo-service';
import { Project } from 'src/app/store/models/project.model';
import { User } from 'src/app/store/models/user.model';
import { Store } from '@ngrx/store';
import { GetUser } from 'src/app/store/actions/user.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  active = 'tasks';
  user$: Observable<User>;
  user: User;

  constructor(
    private todoService: TodoService,
    private store: Store<{ user: User; project: Project }>
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
}
