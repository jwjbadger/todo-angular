import { User } from '../models/user.model';
import * as UserActions from '../actions/user.actions';
import { Action, createReducer, on } from '@ngrx/store';
const clone = require('rfdc')();

let initialState: User = undefined;

const UserReducerHandler = createReducer(
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
    newUser.todos.sort((a, b) => (a.completed ? 1 : 0) - (b.completed ? 1 : 0));

    return newUser;
  }),

  on(UserActions.RemoveTask, (state, { payload }) => {
    let newUser: User = clone(state);

    newUser.todos.splice(payload, 1);

    return newUser;
  }),

  on(UserActions.RemoveAll, (state) => ({ ...state, todos: [] }))
);

export function UserReducer(state: User = initialState, action: Action) {
  return UserReducerHandler(state, action);
}
