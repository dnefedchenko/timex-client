import {Injectable} from '@angular/core';
import {CURRENT_EMPLOYEE_KEY, ROLE_ACCOUNTING, ROLE_EMPLOYEE, ROLE_EXECUTIVE, ROLE_MANAGER} from '../../app.constants';
import {Employee} from '../../model/employee.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public setCurrentEmployee(employee: Employee): void {
    localStorage.setItem(CURRENT_EMPLOYEE_KEY, JSON.stringify(employee));
  }

  public getCurrentEmployee(): Employee {
    return JSON.parse(localStorage.getItem(CURRENT_EMPLOYEE_KEY));
  }

  public clear(): void {
    localStorage.clear();
  }

  public isAuthorized(): boolean {
    return this.getCurrentEmployee() !== null;
  }

  public hasRole(role: string): boolean {
    const currentEmployee: Employee = this.getCurrentEmployee();
    if (currentEmployee === null) {
      return false;
    }
    return currentEmployee.role === role;
  }

  public isEmployee(): boolean {
    return this.hasRole(ROLE_EMPLOYEE);
  }

  public isManager(): boolean {
    return this.hasRole(ROLE_MANAGER);
  }

  public isExecutive(): boolean {
    return this.hasRole(ROLE_EXECUTIVE);
  }

  public isAccountant(): boolean {
    return this.hasRole(ROLE_ACCOUNTING);
  }
}
