import * as ProjectsActions from '../actions/projects.actions';
import { Action, createReducer, on } from '@ngrx/store';
import { Project } from '../models/project.model';
const clone = require('rfdc')();

let initialState: Project[] = undefined;

const ProjectsReducerHandler = createReducer(
  initialState,
  on(ProjectsActions.GetProjects, (state, { payload }) => payload),
  on(ProjectsActions.AddProject, (state, { payload }) => [...state, payload]),
  on(ProjectsActions.RemoveProject, (state, { payload }) => {
    let newProjects: Project[] = clone(state);

    newProjects.splice(payload, 1);

    return newProjects;
  }),
  on(ProjectsActions.ToggleComplete, (state, { payload }) => {
    let newProjects: Project[] = clone(state);

    newProjects[payload.projectIndex].todos[
      payload.taskIndex
    ].completed = !newProjects[payload.projectIndex].todos[payload.taskIndex]
      .completed;
    newProjects[payload.projectIndex].todos.sort(
      (a, b) => (a.completed ? 1 : 0) - (b.completed ? 1 : 0)
    );

    return newProjects;
  }),
  on(ProjectsActions.EditTask, (state, { payload }) => {
    let newProjects: Project[] = clone(state);

    newProjects[payload.projectIndex].todos[payload.taskIndex].title =
      payload.title;
    newProjects[payload.projectIndex].todos[payload.taskIndex].description =
      payload.description;

    return newProjects;
  }),
  on(ProjectsActions.AddTask, (state, { payload }) => {
    let newProject: Project[] = clone(state);

    newProject[payload.projectIndex].todos.push({
      title: payload.title ? payload.title : 'No Title',
      description: payload.description ? payload.description : 'No description',
      completed: false,
    });
    newProject[payload.projectIndex].todos.sort(
      (a, b) => (a.completed ? 1 : 0) - (b.completed ? 1 : 0)
    );

    return newProject;
  }),
  on(ProjectsActions.RemoveTask, (state, { payload }) => {
    let newProjects: Project[] = clone(state);

    newProjects[payload.projectIndex].todos.splice(payload.taskIndex, 1);

    return newProjects;
  }),
  on(ProjectsActions.RemoveAllTasks, (state, { payload }) => {
    let newProjects: Project[] = clone(state);

    newProjects[payload].todos = [];

    return newProjects;
  })
);

export function ProjectsReducer(
  state: Project[] = initialState,
  action: Action
) {
  return ProjectsReducerHandler(state, action);
}
