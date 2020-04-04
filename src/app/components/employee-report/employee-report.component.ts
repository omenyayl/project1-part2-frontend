import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {StateService} from '../../services/state/state.service';
import {CreatedEmployee} from '../../models/CreatedEmployee';
import {getReadableDate} from '../../util/DateUtils';

@Component({
  selector: 'app-employee-report',
  templateUrl: './employee-report.component.html',
  styleUrls: ['./employee-report.component.css']
})
export class EmployeeReportComponent implements OnInit {
  createdEmployee: CreatedEmployee;
  dependentsTableHeader = ['dependentName', 'birthDate', 'relationship', 'sex'];
  worksOnTableHeader = ['projectNumber', 'hours'];
  constructor(private router: Router,
              private state: StateService) {
  }
  getReadableDate = getReadableDate;
  ngOnInit() {
    this.createdEmployee = this.state.getCreatedEmployee();
    if (this.createdEmployee === undefined) {
      this.router.navigate(['home'])
        .catch(e => console.error(e));
    }
  }
}
