import {Employee} from '../../model/employee.interface';
import {Credentials} from '../../model/credentials.interface';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Promise, resolve} from 'q';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private employees: Employee[];

  constructor(private httpClient: HttpClient) {
    this.employees = [
      {
        id: 1,
        username: 'js',
        firstName: 'John',
        lastName: 'Smith',
        role: 'ROLE_EMPLOYEE'
      },
      {
        id: 2,
        username: 'k2',
        firstName: 'Kishore',
        lastName: 'Kumar',
        role: 'ROLE_EMPLOYEE'
      },
      {
        id: 3,
        username: 'yl',
        firstName: 'Ying',
        lastName: 'Lee',
        role: 'ROLE_EMPLOYEE'
      },
      {
        id: 4,
        username: 'zj',
        firstName: 'Zavadi',
        lastName: 'Johari',
        role: 'ROLE_EMPLOYEE'
      },
      {
        id: 5,
        username: 'jd',
        firstName: 'John',
        lastName: 'Doe',
        role: 'ROLE_MANAGER'
      },
      {
        id: 6,
        username: 'jad',
        firstName: 'Jane',
        lastName: 'Doe',
        role: 'ROLE_ACCOUNTING'
      },
      {
        id: 7,
        username: 'mf',
        firstName: 'Morgan',
        lastName: 'Freeman',
        role: 'ROLE_EXECUTIVE'
      },
    ]
    ;
  }

  public login(credentials: Credentials): any {
    const employee = this.employees.find((e: Employee) => e.username === credentials.employeeId);
    return Promise<Employee>(success => {
      success(employee);
    });
  }
}
