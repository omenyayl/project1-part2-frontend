import {Injectable} from '@angular/core';
import {Project} from '../../models/Project';
import {Observable, throwError} from 'rxjs';
import {CreatedEmployee} from '../../models/CreatedEmployee';
import {ProgressBarService} from '../progress-bar/progress-bar.service';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {IsManager} from '../../models/api-response/IsManager';
import {catchError, tap} from 'rxjs/operators';
import { URLManager } from '../../util/URLManager';
import {InsertStatus} from '../../models/api-response/InsertStatus';
import {MatSnackBar} from '@angular/material';
import {ErrorService} from '../error/error.service';
import * as ErrorCodes from '../../models/api-response/ErrorCodes';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  // projects: Project[] = [
  //   {
  //     projectName: 'ProductX',
  //     projectNumber: 1,
  //     projectLocation: 'Bellaire',
  //     departmentNumber: 5,
  //   },
  //   {
  //     projectName: 'ProductY',
  //     projectNumber: 2,
  //     projectLocation: 'Sugarland',
  //     departmentNumber: 5,
  //   },
  //   {
  //     projectName: 'ProductZ',
  //     projectNumber: 3,
  //     projectLocation: 'Houston',
  //     departmentNumber: 5,
  //   },
  //   {
  //     projectName: 'Computerization',
  //     projectNumber: 10,
  //     projectLocation: 'Stafford',
  //     departmentNumber: 4,
  //   },
  //   {
  //     projectName: 'Reorganization',
  //     projectNumber: 20,
  //     projectLocation: 'Houston',
  //     departmentNumber: 1,
  //   },
  //   {
  //     projectName: 'Newbenefits',
  //     projectNumber: 30,
  //     projectLocation: 'Stafford',
  //     departmentNumber: 4,
  //   }
  // ];
  newEmployees: CreatedEmployee[] = [];

  constructor(private progressBarService: ProgressBarService,
              private http: HttpClient,
              private snackbar: MatSnackBar,
              private error: ErrorService) {
  }
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(URLManager.getProjectsURL())
      .pipe(
        catchError(this.error.handleError<Project[]>('getProjects()', []))
      );
  }
  addEmployee(createdEmployee: CreatedEmployee): Observable<InsertStatus> {
    console.log(JSON.stringify(createdEmployee, null, 2));
    return this.http.post<InsertStatus>(URLManager.addEmployeeURL(), createdEmployee)
      .pipe(
        catchError(this.error.handleError<InsertStatus>('addEmployee()', {
          success: false,
          errorMessage: 'A network error occurred when trying to create an employee, please try again later.',
          errorCode: ErrorCodes.ERROR_UNKNOWN
        }))
      );
    // return new Observable(subscriber => {
    //   setTimeout(() => {
    //     this.newEmployees.push({
    //       dependents: createdEmployee.dependents,
    //       employee: createdEmployee.employee,
    //       worksOn: createdEmployee.worksOn
    //     });
    //     subscriber.next({errorCode: 1, errorMessage: 'some message', success: false});
    //   }, 1000);
    // });
  }
  isManager(ssn: string): Observable<IsManager> {
    return this.http.get<IsManager>(URLManager.isManagerURL(ssn))
      .pipe(
        catchError(this.error.handleError<IsManager>('isManager', null))
      );
  }
}
