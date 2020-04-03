import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router} from '@angular/router';
import {StateService} from '../../services/state/state.service';
import {APIService} from '../../services/api/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ssn = '';
  processing = false;
  constructor(private snackBar: MatSnackBar,
              private router: Router,
              private state: StateService,
              private api: APIService) { }

  ngOnInit() {
  }
  onClickSubmit() {
    if (this.processing) { return; }
    if (this.ssnValid()) {
      this.processing = true;
      this.api.isManager(this.ssn)
        .subscribe(isManager => {
          if (!isManager) {
            this.showSnack('Access denied: you are not a manager');
          } else {
            this.navigateToNewEmployeePage();
          }
          this.processing = false;
        });
    } else {
      this.showSnack('Invalid employeeSSN');
    }
  }

  /**
   * @return If the employeeSSN is valid
   */
  ssnValid(): boolean {
    return this.ssn.length > 0;
  }
  showSnack(message: string) {
    this.snackBar.open(message, null, { duration: 2000 });
  }
  private navigateToNewEmployeePage() {
    this.state.setManagerSSN(this.ssn);
    this.router.navigate(['/new-employee'])
      .catch(e => console.error(e));
  }
}
