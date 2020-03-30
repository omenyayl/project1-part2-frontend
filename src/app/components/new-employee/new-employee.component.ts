import { Component, OnInit } from '@angular/core';
import {StateService} from '../../state.service';
import {Router} from '@angular/router';
import {Employee} from '../../models/Employee';
import {MatDatepicker, MatTableDataSource} from '@angular/material';
import {AbstractControl, Form, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Project} from '../../models/Project';
import {APIService} from '../../services/api.service';
import {Dependent} from '../../models/Dependent';

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
    SSN: new FormControl('123456789', valid(Validators.required)),
    firstName: new FormControl('oleg', valid(Validators.required)),
    middleInitial: new FormControl('i', valid(Validators.required)),
    lastName: new FormControl('menyaylenko', valid(Validators.required)),
    birthDate: new FormControl(new Date('9/28/1997'), valid(Validators.required)),
    address: new FormControl('3453 paige ct', valid(Validators.required)),
    sex: new FormControl('m', valid(Validators.required, Validators.maxLength(1), Validators.pattern('(m|f|F|M)'))),
    salary: new FormControl('4326', valid(Validators.required)),
    supervisorSSN: new FormControl('163948572', valid(Validators.required)),
    departmentNumber: new FormControl('3', valid(Validators.required)),
    email: new FormControl('asdgoi@yahoo.com', valid(Validators.required)),
  });
  // projects info form
  projects: Project[];
  projectTableColumns = ['projectNumber', 'projectName', 'projectHours'];
  projectHours: FormGroup = new FormGroup({});
  hoursFormGroup = new FormGroup({});
  // dependents info form
  newDependents: Dependent[] = [];
  newDependentsTableSource: MatTableDataSource<Dependent> = new MatTableDataSource(this.newDependents);
  dependentTableColumns = ['dependentName', 'sex', 'birthDate', 'relationship'];
  dependentsFormGroup = new FormGroup({
    dependentName: new FormControl('Alice', valid(Validators.required)),
    sex: new FormControl('f', valid(Validators.required)),
    birthDate: new FormControl(new Date('02/23/2004'), valid(Validators.required)),
    relationship: new FormControl('daughter', valid(Validators.required))
  });

  constructor(private state: StateService,
              private api: APIService,
              private router: Router) { }

  ngOnInit() {
    this.state.setManagerSSN('12345');
    if (this.state.getManagerSSN() === '') {
      this.router.navigate(['home'])
        .catch(e => console.error(e));
    }
    this.loadProjects();
  }
  private loadProjects() {
    this.api.getProjects()
      .subscribe(p => {
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
  private onFocusoutHoursTable() {
    this.hoursFormGroup.updateValueAndValidity();
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
    console.log(this.newDependents);
  }
}
