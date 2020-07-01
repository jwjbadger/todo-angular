import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project-service.service';
import { Store } from '@ngrx/store';
import { Project } from 'src/app/store/models/project.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  projects$: Observable<Project>;
  constructor(
    private projectService: ProjectService,
    private store: Store<{ projects: Project[] }>
  ) {}

  ngOnInit(): void {}
}
