import { Component, OnInit } from '@angular/core';
import {StateService} from '../../state.service';
import {Router} from '@angular/router';
import {Employee} from '../../models/Employee';
import {MatDatepicker} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';

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
  employee: Employee = new Employee();
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
  constructor(private state: StateService,
              private router: Router) { }

  ngOnInit() {
    this.state.setManagerSSN('12345');
    if (this.state.getManagerSSN() === '') {
      this.router.navigate(['home'])
        .catch(e => console.error(e));
    }
  }
  onBlurEmployeeInfoCard() {
    if (this.employeeInfo.valid) {
      this.employee = {
        address: this.employeeInfo.controls.address.value,
        birthDate: this.employeeInfo.controls.birthDate.value,
        departmentNumber: this.employeeInfo.controls.departmentNumber.value,
        email: this.employeeInfo.controls.email.value,
        firstName: this.employeeInfo.controls.firstName.value,
        lastName: this.employeeInfo.controls.lastName.value,
        middleInitial: this.employeeInfo.controls.middleInitial.value,
        salary: this.employeeInfo.controls.salary.value,
        sex: this.employeeInfo.controls.sex.value,
        supervisorSSN: this.employeeInfo.controls.supervisorSSN.value,
        SSN: this.employeeInfo.controls.SSN.value
      };
      console.log(this.employee);
    }
  }
}
