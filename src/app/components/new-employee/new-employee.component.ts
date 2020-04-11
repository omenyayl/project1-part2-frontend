import { Component, OnInit } from '@angular/core';
import {StateService} from '../../services/state/state.service';
import {Router} from '@angular/router';
import {MatDatepicker, MatSnackBar, MatTableDataSource} from '@angular/material';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Project} from '../../models/Project';
import {APIService} from '../../services/api/api.service';
import {Dependent} from '../../models/Dependent';
import {EmployeeService} from '../../services/employee/employee.service';
import {Employee} from '../../models/Employee';
import {WorksOn} from '../../models/WorksOn';
import {CreatedEmployee} from '../../models/CreatedEmployee';
import {getReadableDate} from '../../util/DateUtils';
import {ProgressBarService} from '../../services/progress-bar/progress-bar.service';
import {InsertStatus} from '../../models/api-response/InsertStatus';

function valid(...validators) {
  return Validators.compose(validators);
}
@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css']
})
export class NewEmployeeComponent implements OnInit {
  birthDate: MatDatepicker<Date>;
  // employee info form
  employeeInfo: FormGroup = new FormGroup({
    employeeSSN: new FormControl('', valid(Validators.required, Validators.minLength(9), Validators.maxLength(9))),
    firstName: new FormControl('', valid(Validators.required, Validators.maxLength(15))),
    middleInitial: new FormControl('', valid(Validators.maxLength(1))),
    lastName: new FormControl('', valid(Validators.required, Validators.maxLength(15))),
    birthDate: new FormControl(),
    address: new FormControl('', valid(Validators.maxLength(30))),
    sex: new FormControl('', valid(Validators.maxLength(1), Validators.pattern('(m|f|F|M)'))),
    salary: new FormControl('', valid(Validators.required, Validators.max(99999999))),
    supervisorSSN: new FormControl('', valid(Validators.minLength(9), Validators.maxLength(9))),
    departmentNumber: new FormControl('', valid(Validators.required, Validators.max(999))),
    email: new FormControl('', valid(Validators.maxLength(50))),
  });
  // projects info form
  projects: Project[];
  projectTableColumns = ['projectNumber', 'projectName', 'projectHours'];
  hoursFormGroup = new FormGroup({});
  // dependents info form
  hasDependents = false;
  newDependents: Dependent[] = [];
  newDependentsTableSource: MatTableDataSource<Dependent> = new MatTableDataSource(this.newDependents);
  dependentTableColumns = ['dependentName', 'sex', 'birthDate', 'relationship'];
  dependentsFormGroup = new FormGroup({
    dependentName: new FormControl('', valid(Validators.required, Validators.maxLength(15))),
    sex: new FormControl('', valid(Validators.required, Validators.maxLength(1), Validators.pattern('(m|f|F|M)'))),
    birthDate: new FormControl(),
    relationship: new FormControl('', valid(Validators.maxLength(8)))
  });

  constructor(private state: StateService,
              private employeeService: EmployeeService,
              private api: APIService,
              private router: Router,
              private snackbar: MatSnackBar,
              private progressBar: ProgressBarService) { }
  getReadableDate = getReadableDate;
  ngOnInit() {
    if (this.state.getManagerSSN() === undefined) {
      this.router.navigate(['home'])
        .catch(e => console.error(e));
    }
    this.loadProjects();
    this.employeeInfo.controls.supervisorSSN.setValue(this.state.getManagerSSN());
  }
  onClickButtonCreateEmployee() {
    const employee: Employee = this.parseEmployeeInfoFormGroup();
    const dependents = this.newDependents;
    const worksOn = this.parseHoursFormGroup();
    const createdEmployee: CreatedEmployee = {
      dependents, employee, worksOn
    };
    this.progressBar.showProgressBar();
    this.employeeService.createEmployee(createdEmployee)
      .subscribe((status: InsertStatus) => {
        if (!status.success) {
          this.snackbar.open(status.errorMessage, null, {duration: 2000});
        } else {
          this.launchEmployeeReport(createdEmployee);
        }
        this.progressBar.hideProgressBar();
      });
  }
  onClickButtonAddDependent() {
    if (this.dependentsFormGroup.invalid) { return; }
    const dependentValue = this.dependentsFormGroup.value;
    const dependent: Dependent = {
      employeeSSN: this.state.getManagerSSN(),
      dependentName: dependentValue.dependentName,
      birthDate: dependentValue.birthDate,
      relationship: dependentValue.relationship,
      sex: dependentValue.sex
    };
    this.newDependents.push(dependent);
    this.newDependentsTableSource = new MatTableDataSource(this.newDependents);
    this.dependentsFormGroup.reset();
  }
  private loadProjects() {
    this.api.getProjects()
      .subscribe(p => {
        if (p.length === 0) {
          this.snackbar.open('Unable to get the list of available projects from the server.', null, {duration: 4000});
        }
        this.projects = p;
        this.initHoursFormGroup(p);
      });
  }
  private initHoursFormGroup(projects: Project[]) {
    for (const project of projects) {
      this.hoursFormGroup.controls[project.projectNumber] = new FormControl(0, valid(Validators.min(0), Validators.required));
    }
    this.hoursFormGroup.setValidators(
      (control: AbstractControl): ValidationErrors | null => {
        const h = control.value;
        let totalHours = 0;
        for (const pNum in h) {
          if (h.hasOwnProperty(pNum)) {
            const hours = h[pNum];
            if (hours < 0) { return {withinHourLimit: false}; }
            totalHours += hours;
          }
        }
        return totalHours > 40 || totalHours < 0 ? {withinHourLimit: false} : null;
      }
    );
  }
  onFocusoutHoursTable() {
    this.hoursFormGroup.updateValueAndValidity();
  }
  private parseEmployeeInfoFormGroup(): Employee {
    const employeeInfoValue = this.employeeInfo.value;
    return {
      employeeSSN: employeeInfoValue.employeeSSN,
      firstName: employeeInfoValue.firstName,
      middleInitial: employeeInfoValue.middleInitial,
      lastName: employeeInfoValue.lastName,
      birthDate: employeeInfoValue.birthDate,
      address: employeeInfoValue.address,
      sex: employeeInfoValue.sex,
      salary: employeeInfoValue.salary,
      supervisorSSN: employeeInfoValue.supervisorSSN,
      departmentNumber: employeeInfoValue.departmentNumber,
      email: employeeInfoValue.email,
    };
  }
  private parseHoursFormGroup(): WorksOn[] {
    const worksOn: WorksOn[] = [];
    const worksOnValue = this.hoursFormGroup.value;
    for (const pNum in worksOnValue) {
      if (worksOnValue.hasOwnProperty(pNum) && worksOnValue[pNum] > 0) {
        worksOn.push({
          projectNumber: parseInt(pNum, 10),
          hours: worksOnValue[pNum]
        });
      }
    }
    return worksOn;
  }

  private launchEmployeeReport(createdEmployee: CreatedEmployee) {
    this.state.setCreatedEmployee(createdEmployee);
    this.router.navigate(['employee-report'])
      .catch(e => console.error(e));
  }
}
