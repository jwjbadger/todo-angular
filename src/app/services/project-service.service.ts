import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Project } from '../store/models/project.model';
import { UserActionTypes } from '../store/actions/user.actions';

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
export class ProjectService {
  readonly ROOT_URL = 'http://127.0.0.1:3000/';

  constructor(private http: HttpClient) {}

  getProjects(_id: string) {
    return this.http.get(this.ROOT_URL + 'projects/' + _id, httpOptions);
  }
  postProject(project: Project) {
    return this.http.post(this.ROOT_URL + 'projects/', project, httpOptions);
  }
  putProject(project: Project) {
    return this.http.put(
      this.ROOT_URL + 'projects/' + project._id,
      project,
      httpOptions
    );
  }
  deleteProject(_id: string) {
    return this.http.delete(this.ROOT_URL + 'projects/' + _id, httpOptions);
  }
}
