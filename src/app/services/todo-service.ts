import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../store/models/user.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    'Access-Control-Allow-Headers': 'auth-token',
    'auth-token':
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWY4ZjFhZjdiMWEyNDE4NzgzNDVhNTgiLCJpYXQiOjE1OTM0NDAzNDh9.-7nymfTY0kHOcBUwuoJHnweb4-v46h6ee1HCMO4bzCs',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  readonly ROOT_URL = 'http://127.0.0.1:3000/';

  constructor(private http: HttpClient) {}
  getTodos(): Observable<User> {
    return this.http.get<User>(
      this.ROOT_URL + 'users/' + '5ef8f1af7b1a241878345a58',
      httpOptions
    );
  }
  patch(user: User) {
    return this.http.patch(
      this.ROOT_URL + 'users/' + '5ef8f1af7b1a241878345a58',
      { todos: user.todos },
      httpOptions
    );
  }
}
