import { Injectable } from '@angular/core';
import {Observable, Subscriber} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {
  progressBarShown: Observable<boolean>;
  progressBarSubscriber: Subscriber<boolean>;
  constructor() {
    this.progressBarShown = new Observable(subscriber => {
      this.progressBarSubscriber = subscriber;
      subscriber.next(false); // default value
    });
  }
  isProgressBarShown(): Observable<boolean> {
    return this.progressBarShown;
  }
  showProgressBar() {
    this.progressBarSubscriber.next(true);
  }
  hideProgressBar() {
    this.progressBarSubscriber.next(false);
  }
}
