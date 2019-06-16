import {Injectable} from '@angular/core';
import {CURRENT_EMPLOYEE_KEY} from '../../app.constants';
import {Employee} from '../../model/employee.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public hasRole(role: string): boolean {
    const currentEmployee: Employee = JSON.parse(localStorage.getItem(CURRENT_EMPLOYEE_KEY));
    return currentEmployee.role === role;
  }

  public setCurrentEmployee(employee: Employee): void {
    localStorage.setItem(CURRENT_EMPLOYEE_KEY, JSON.stringify(employee));
  }
}
