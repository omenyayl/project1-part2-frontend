import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router} from '@angular/router';
import {StateService} from '../../services/state/state.service';
import {APIService} from '../../services/api/api.service';
import {ProgressBarService} from '../../services/progress-bar/progress-bar.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ssn = '';
  processing = false;
  ssnInputForm = new FormControl('', Validators.compose([
    Validators.required,
    Validators.minLength(9),
    Validators.maxLength(9)]));
  constructor(private snackBar: MatSnackBar,
              private router: Router,
              private state: StateService,
              private api: APIService,
              private progressBar: ProgressBarService) { }

  ngOnInit() {
  }
  onClickSubmit() {
    if (this.processing) { return; }
    if (this.ssnInputForm.valid) {
      this.ssn = this.ssnInputForm.value;
      this.processing = true;
      this.progressBar.showProgressBar();
      this.api.isManager(this.ssn)
        .subscribe(isManager => {
          if (isManager === null) {
            this.showSnack('A network error occurred, please try again later.');
          } else if (!isManager.manager) {
            this.showSnack('Access denied: you are not a manager');
          } else {
            this.navigateToNewEmployeePage();
          }
          this.processing = false;
          this.progressBar.hideProgressBar();
        });
    } else {
      this.showSnack('Invalid employee SSN');
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
