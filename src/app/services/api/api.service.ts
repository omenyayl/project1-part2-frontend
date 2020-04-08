import {Injectable} from '@angular/core';
import {Project} from '../../models/Project';
import {Observable} from 'rxjs';
import {CreatedEmployee} from '../../models/CreatedEmployee';
import {ProgressBarService} from '../progress-bar/progress-bar.service';
import {HttpClient} from '@angular/common/http';
import {IsManager} from '../../models/api-response/IsManager';
import {catchError} from 'rxjs/operators';
import { URLManager } from '../../util/URLManager';
import {InsertStatus} from '../../models/api-response/InsertStatus';
import {MatSnackBar} from '@angular/material';
import {ErrorService} from '../error/error.service';
import * as ErrorCodes from '../../models/api-response/ErrorCodes';

@Injectable({
  providedIn: 'root'
})
export class APIService {
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
  }
  isManager(ssn: string): Observable<IsManager> {
    return this.http.get<IsManager>(URLManager.isManagerURL(ssn))
      .pipe(
        catchError(this.error.handleError<IsManager>('isManager', null))
      );
  }
}
