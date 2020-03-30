import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private managerSSN = '';
  constructor() { }
  getManagerSSN() { return this.managerSSN; }
  setManagerSSN(ssn: string) { this.managerSSN = ssn; }
}
