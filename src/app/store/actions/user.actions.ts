import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

export enum UserActionTypes {
  GET_USER = '[User] Get User',
  TOGGLE_COMPLETE = '[User] Toggle Complete',
  EDIT_TASK = '[User] Edit Task',
  ADD_TASK = '[User] Add Task',
  REMOVE_TASK = '[User] Remove Task',
  REMOVE_ALL_TASKS = '[User] Remove All Tasks',
}

export const GetUser = createAction(
  UserActionTypes.GET_USER,
  props<{ payload: User }>()
);

export const ToggleComplete = createAction(
  UserActionTypes.TOGGLE_COMPLETE,
  props<{ payload: number }>()
);

export const EditTask = createAction(
  UserActionTypes.EDIT_TASK,
  props<{ payload: { title: string; description: string; index: number } }>()
);

export const AddTask = createAction(
  UserActionTypes.ADD_TASK,
  props<{ payload: { title: string; description: string } }>()
);

export const RemoveTask = createAction(
  UserActionTypes.REMOVE_TASK,
  props<{ payload: number }>()
);

export const RemoveAll = createAction(UserActionTypes.REMOVE_ALL_TASKS);
