import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  readonly ROOT_URL = 'http://127.0.0.1:3000/';

  constructor(private http: HttpClient) {}
  getTodos(): Observable<User> {
    return this.http.get<User>(this.ROOT_URL + 'users/' + 'default');
  }
  patch(user: User) {
    return this.http.patch(
      this.ROOT_URL + 'users/' + user._id,
      { todos: user.todos },
      httpOptions
    );
  }
}
