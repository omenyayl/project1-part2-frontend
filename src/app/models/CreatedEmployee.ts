import {Employee} from './Employee';
import {WorksOn} from './WorksOn';
import {Dependent} from './Dependent';

export class CreatedEmployee {
  employee: Employee;
  worksOn: WorksOn[];
  dependents: Dependent[];
}

