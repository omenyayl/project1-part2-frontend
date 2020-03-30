import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ssn = '';
  constructor(private snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit() {
  }
  onClickSubmit() {
    if (this.ssnValid()) {
      console.log(this.ssn);
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
