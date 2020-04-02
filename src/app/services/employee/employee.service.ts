import { Injectable } from '@angular/core';
import {APIService} from '../api/api.service';
import {CreatedEmployee} from '../../models/CreatedEmployee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private api: APIService) { }
  createEmployee(createdEmployee: CreatedEmployee) {
    console.log('created employee: ');
    console.log(JSON.stringify(createdEmployee, null, 2));
  }
}
