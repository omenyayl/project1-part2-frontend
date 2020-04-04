import { Injectable } from '@angular/core';
import {CreatedEmployee} from '../../models/CreatedEmployee';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private managerSSN;
  private createdEmployee;
  constructor() {
    // this.managerSSN = '12345';
    // this.createdEmployee = {
    //   dependents: [
    //     {
    //       employeeSSN: '12345',
    //       dependentName: 'Alice',
    //       birthDate: new Date('2004-02-23T05:00:00.000Z'),
    //       relationship: 'daughter',
    //       sex: 'f'
    //     },
    //     {
    //       employeeSSN: '12345',
    //       dependentName: 'bob',
    //       birthDate: new Date('2020-04-22T04:00:00.000Z'),
    //       relationship: 'son',
    //       sex: 'm'
    //     }
    //   ],
    //   employee: {
    //     SSN: '123456789',
    //     firstName: 'oleg',
    //     middleInitial: 'i',
    //     lastName: 'menyaylenko',
    //     birthDate: new Date('1997-08-28T04:00:00.000Z'),
    //     address: '3453 paige ct',
    //     sex: 'm',
    //     salary: 4326,
    //     supervisorSSN: '163948572',
    //     departmentNumber: 3,
    //     email: 'asdgoi@yahoo.com'
    //   },
    //   worksOn: [
    //     {
    //       projectNumber: 2,
    //       hours: 23
    //     },
    //     {
    //       projectNumber: 3,
    //       hours: 12
    //     }
    //   ]
    // };
  }
  getManagerSSN() { return this.managerSSN; }
  setManagerSSN(ssn: string) { this.managerSSN = ssn; }
  getCreatedEmployee() { return this.createdEmployee; }
  setCreatedEmployee(e: CreatedEmployee) { this.createdEmployee = e; }
}
