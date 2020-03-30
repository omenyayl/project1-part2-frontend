import {Injectable} from '@angular/core';
import {Project} from '../models/Project';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  projects: Project[] = [
    {
      projectName: 'ProductX',
      projectNumber: 1,
      projectLocation: 'Bellaire',
      departmentNumber: 5,
    },
    {
      projectName: 'ProductY',
      projectNumber: 2,
      projectLocation: 'Sugarland',
      departmentNumber: 5,
    },
    {
      projectName: 'ProductZ',
      projectNumber: 3,
      projectLocation: 'Houston',
      departmentNumber: 5,
    },
    {
      projectName: 'Computerization',
      projectNumber: 10,
      projectLocation: 'Stafford',
      departmentNumber: 4,
    },
    {
      projectName: 'Reorganization',
      projectNumber: 20,
      projectLocation: 'Houston',
      departmentNumber: 1,
    },
    {
      projectName: 'Newbenefits',
      projectNumber: 30,
      projectLocation: 'Stafford',
      departmentNumber: 4,
    }
  ];

  constructor() {
  }

  getProjects(): Observable<Project[]> {
    return new Observable((observer) => {
      observer.next(this.projects);
    });
  }
}
