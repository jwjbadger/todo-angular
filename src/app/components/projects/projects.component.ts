import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project-service.service';
import { Store } from '@ngrx/store';
import { Project } from 'src/app/store/models/project.model';
import { Observable } from 'rxjs';
import { User } from 'src/app/store/models/user.model';
import { GetProjects } from 'src/app/store/actions/projects.actions';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  projects$: Observable<Project[]>;
  projects: Project[];

  user$: Observable<User>;
  user: User;

  constructor(
    private projectService: ProjectService,
    private store: Store<{ user: User; projects: Project[] }>
  ) {
    this.user$ = this.store.select((state) => state.user);
    this.user$.subscribe((store) => {
      this.user = store;
      this.projectService
        .getProjects(store.name)
        .toPromise()
        .then((projects) => {
          this.store.dispatch(GetProjects({ payload: projects }));
          this.projects$ = this.store.select((state) => state.projects);
          this.projects$.subscribe((store) => {
            this.projects = store;
          });
        });
    });
  }

  ngOnInit(): void {}
}
