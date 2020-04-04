import {environment} from '../../environments/environment';

export class URLManager {
  static isManagerURL(ssn: string): string {
    return new URL(`/is-manager/${ssn}`, environment.API_URL).href;
  }
  static getProjectsURL(): string {
    return new URL('/projects', environment.API_URL).href;
  }
  static addEmployeeURL(): string {
    return new URL('/employees', environment.API_URL).href;
  }
}
