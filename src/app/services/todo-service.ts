import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  readonly ROOT_URL = 'http://127.0.0.1:3000/';

  constructor(private http: HttpClient) {}
  getTodos(): Observable<User> {
    return this.http.get<User>(this.ROOT_URL + 'users/' + 'default');
  }
}
