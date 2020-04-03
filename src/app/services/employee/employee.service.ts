import { Injectable } from '@angular/core';
import {APIService} from '../api/api.service';
import {CreatedEmployee} from '../../models/CreatedEmployee';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private api: APIService) { }
  createEmployee(createdEmployee: CreatedEmployee): Observable<Error> {
    return this.api.addEmployee(createdEmployee)
      .pipe(tap(e => {
        if (e) {
          console.error(e);
        }
      }));
  }
}
