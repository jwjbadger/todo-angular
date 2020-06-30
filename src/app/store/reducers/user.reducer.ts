import { User } from '../models/user.model';
import * as UserActions from '../actions/user.actions';
import { Action, createReducer, on } from '@ngrx/store';
const clone = require('rfdc')();

let initialState: User = undefined;

const UserReducer = createReducer(
  initialState,

  on(UserActions.GetUser, (state, { payload }) => payload),

  on(UserActions.ToggleComplete, (state, { payload }) => {
    let newUser: User = clone(state);
    newUser.todos[payload].completed = !newUser.todos[payload].completed;

    newUser.todos.push(newUser.todos[payload]);
    newUser.todos.splice(payload, 1);
    return newUser;
  }),

  on(UserActions.EditTask, (state, { payload }) => {
    let newUser: User = clone(state);
    newUser.todos[payload.index].title = payload.title;
    newUser.todos[payload.index].description = payload.description;

    return newUser;
  }),

  on(UserActions.AddTask, (state, { payload }) => {
    let newUser: User = clone(state);
    newUser.todos.push({
      title: payload.title ? payload.title : 'No Title',
      description: payload.description ? payload.description : 'No description',
      completed: false,
    });

    return newUser;
  }),

  on(UserActions.RemoveTask, (state, { payload }) => {
    let newUser: User = clone(state);

    newUser.todos.splice(payload, 1);
    console.log(newUser);

    return newUser;
  }),

  on(UserActions.RemoveAll, (state) => ({ ...state, todos: [] }))
);

export function reducer(state: User = initialState, action: Action) {
  return UserReducer(state, action);
}
