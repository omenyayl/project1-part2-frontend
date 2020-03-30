import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import {NavigationExtras, Router} from '@angular/router';
import {StateService} from '../../state.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ssn = '';
  constructor(private snackBar: MatSnackBar,
              private router: Router,
              private state: StateService) { }

  ngOnInit() {
  }
  onClickSubmit() {
    if (this.ssnValid()) {
      this.state.setManagerSSN(this.ssn);
      this.router.navigate(['/new-employee'])
        .catch(e => console.error(e));
    } else {
      this.showSnack('Invalid SSN');
    }
  }

  /**
   * @return If the SSN is valid
   */
  ssnValid(): boolean {
    return this.ssn.length > 0;
  }
  showSnack(message: string) {
    this.snackBar.open(message, null, { duration: 2000 });
  }
}
