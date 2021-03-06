import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/app/store/models/project.model';
import { Store } from '@ngrx/store';
import { User } from 'src/app/store/models/user.model';
import { ProjectService } from 'src/app/services/project-service.service';
import {
  AddTask,
  RemoveProject,
  ToggleComplete,
  RemoveTask,
} from 'src/app/store/actions/projects.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  @Input() project: Project;

  projects$: Observable<Project[]>;
  projects: Project[];
  index: number;

  constructor(
    private projectService: ProjectService,
    private store: Store<{ user: User; projects: Project[] }>
  ) {}

  ngOnInit(): void {
    this.projects$ = this.store.select((state) => state.projects);
    this.projects$.subscribe((store) => {
      this.projects = store;
      this.index = store.indexOf(this.project);
      this.projectService.putProject(this.project).toPromise();
    });
  }

  deleteProject() {
    this.projectService.deleteProject(this.project._id).toPromise();
    this.store.dispatch(RemoveProject({ payload: this.index }));
  }

  createNew(title: string, description: string) {
    this.store.dispatch(
      AddTask({
        payload: {
          title: title,
          description: description,
          projectIndex: this.index,
        },
      })
    );
  }

  toggleComplete(index: number) {
    this.store.dispatch(
      ToggleComplete({
        payload: { projectIndex: this.index, taskIndex: index },
      })
    );
  }

  deleteTask(index: number) {
    this.store.dispatch(
      RemoveTask({ payload: { projectIndex: this.index, taskIndex: index } })
    );
  }
}
