import {Injectable} from '@angular/core';
import {Project} from '../../models/Project';
import {Observable} from 'rxjs';
import {CreatedEmployee} from '../../models/CreatedEmployee';
import {Employee} from '../../models/Employee';
import {WorksOn} from '../../models/WorksOn';
import {Dependent} from '../../models/Dependent';
import {ProgressBarService} from '../progress-bar/progress-bar.service';

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
  newEmployees: CreatedEmployee[] = [];

  constructor(private progressBarService: ProgressBarService) {
  }

  getProjects(): Observable<Project[]> {
    this.progressBarService.showProgressBar();
    return new Observable(observer => {
      observer.next(this.projects);
      this.progressBarService.hideProgressBar();
    });
  }
  addEmployee(createdEmployee: CreatedEmployee): Observable<Error> {
    return new Observable(subscriber => {
      this.progressBarService.showProgressBar();
      setTimeout(() => {
        this.newEmployees.push({
          dependents: createdEmployee.dependents,
          employee: createdEmployee.employee,
          worksOn: createdEmployee.worksOn
        });
        subscriber.next(null);
        this.progressBarService.hideProgressBar();
      }, 1000);
    });
  }
  isManager(ssn: string): Observable<boolean> {
    this.progressBarService.showProgressBar();
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(true);
        this.progressBarService.hideProgressBar();
      }, 1000);
    });
  }
}
