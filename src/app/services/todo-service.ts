import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../store/models/user.model';
import * as jwt_decode from 'jwt-decode';

let httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    'Access-Control-Allow-Headers': 'auth-token',
    'auth-token': localStorage.getItem('JWT')
      ? localStorage.getItem('JWT')
      : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWZiMzNhY2M4ZDdkZTM2MWM5NzMzMTAiLCJpYXQiOjE1OTM1MjEyMTJ9.koQFvcuhPYWcbnWkQiHvBwgNz-dgQukUGUONv2XMNiw',
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
      this.ROOT_URL +
        'users/' +
        (localStorage.getItem('id')
          ? localStorage.getItem('id')
          : '5efb33acc8d7de361c973310'),
      httpOptions
    );
  }
  patch(user: User) {
    return this.http.patch(
      this.ROOT_URL +
        'users/' +
        (localStorage.getItem('id')
          ? localStorage.getItem('id')
          : '5efb33acc8d7de361c973310'),
      { todos: user.todos },
      httpOptions
    );
  }

  async login(name: string, pass: string): Promise<any> {
    return this.http
      .post(
        this.ROOT_URL + 'users/login',
        { name: name, password: pass },
        httpOptions
      )
      .toPromise()
      .then(
        (data: any) => {
          localStorage.setItem('JWT', data.token);
          localStorage.setItem('id', jwt_decode(data.token)._id);
          return { state: 'Success' };
        },
        (err) => {
          return err;
        }
      );
  }
  async register(name: string, pass: string): Promise<any> {
    return this.http
      .post(
        this.ROOT_URL + 'users/register',
        { name: name, password: pass },
        httpOptions
      )
      .toPromise()
      .then(
        (data) => {
          return this.login(name, pass).then((data) => {
            return { stat: 'Success', loginStat: data };
          });
        },
        (err) => {
          return err;
        }
      );
  }
}
