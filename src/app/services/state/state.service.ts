import { Injectable } from '@angular/core';
import {CreatedEmployee} from '../../models/CreatedEmployee';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private managerSSN;
  private createdEmployee;
  constructor() {
  }
  getManagerSSN() { return this.managerSSN; }
  setManagerSSN(ssn: string) { this.managerSSN = ssn; }
  getCreatedEmployee() { return this.createdEmployee; }
  setCreatedEmployee(e: CreatedEmployee) { this.createdEmployee = e; }
}
