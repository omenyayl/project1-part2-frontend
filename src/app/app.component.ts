import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProgressBarService} from './services/progress-bar/progress-bar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'project1-part2-frontend';
  progressBarShown = false;
  constructor(private router: Router,
              private progressBarService: ProgressBarService) {}
  ngOnInit() {
    this.progressBarService.isProgressBarShown()
      .subscribe(b => {
        this.progressBarShown = b;
      });
  }
  onClickButtonHome() {
    this.router.navigate(['home'])
      .catch(e => console.error(e));
  }
}
