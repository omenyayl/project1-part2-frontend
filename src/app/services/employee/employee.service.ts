import { Injectable } from '@angular/core';
import {APIService} from '../api/api.service';
import {CreatedEmployee} from '../../models/CreatedEmployee';
import {Observable} from 'rxjs';
import {InsertStatus} from '../../models/api-response/InsertStatus';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private api: APIService) { }
  createEmployee(createdEmployee: CreatedEmployee): Observable<InsertStatus> {
    return this.api.addEmployee(createdEmployee);
  }
}
