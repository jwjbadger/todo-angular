import { createAction, props } from '@ngrx/store';
import { Project } from '../models/project.model';

export enum ProjectsActionTypes {
  GET_PROJECTS = '[Projects] Get Projects',
  ADD_PROJECT = '[Projects] Add Project',
  REMOVE_PROJECT = '[Projects] Remove Project',
  EDIT_PROJECT = '[Projects] Edit Project',
  TOGGLE_COMPLETE = '[Projects] Toggle Complete',
  EDIT_TASK = '[Projects] Edit Task',
  ADD_TASK = '[Projects] Add Task',
  REMOVE_TASK = '[Projects] Remove Task',
  REMOVE_ALL_TASKS = '[Projects] Remove All Tasks',
}

export const GetProjects = createAction(
  ProjectsActionTypes.GET_PROJECTS,
  props<{ payload: Project[] }>()
);

export const AddProject = createAction(
  ProjectsActionTypes.ADD_PROJECT,
  props<{ payload: Project }>()
);

export const RemoveProject = createAction(
  ProjectsActionTypes.REMOVE_PROJECT,
  props<{ payload: number }>()
);

export const ToggleComplete = createAction(
  ProjectsActionTypes.TOGGLE_COMPLETE,
  props<{ payload: { projectIndex: number; taskIndex: number } }>()
);

export const EditTask = createAction(
  ProjectsActionTypes.EDIT_TASK,
  props<{
    payload: {
      title: string;
      description: string;
      projectIndex: number;
      taskIndex: number;
    };
  }>()
);

export const AddTask = createAction(
  ProjectsActionTypes.ADD_TASK,
  props<{
    payload: { title: string; description: string; projectIndex: number };
  }>()
);

export const RemoveTask = createAction(
  ProjectsActionTypes.REMOVE_TASK,
  props<{ payload: { projectIndex: number; taskIndex: number } }>()
);

export const RemoveAllTasks = createAction(
  ProjectsActionTypes.REMOVE_ALL_TASKS,
  props<{ payload: number }>()
);
