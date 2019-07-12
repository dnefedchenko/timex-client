import {Employee} from '../../../model/employee.interface';
import {Credentials} from '../../../model/credentials.interface';
import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private employees: Employee[];

  constructor(@Inject('apiUrl') private apiUrl: string, private httpClient: HttpClient) {
    this.employees = [
      {
        id: 1,
        email: 'js',
        firstName: 'John',
        lastName: 'Smith',
        role: 'ROLE_EMPLOYEE'
      },
      {
        id: 2,
        email: 'k2',
        firstName: 'Kishore',
        lastName: 'Kumar',
        role: 'ROLE_EMPLOYEE'
      },
      {
        id: 3,
        email: 'yl',
        firstName: 'Ying',
        lastName: 'Lee',
        role: 'ROLE_EMPLOYEE'
      },
      {
        id: 4,
        email: 'zj',
        firstName: 'Zavadi',
        lastName: 'Johari',
        role: 'ROLE_EMPLOYEE'
      },
      {
        id: 5,
        email: 'jd',
        firstName: 'John',
        lastName: 'Doe',
        role: 'ROLE_MANAGER'
      },
      {
        id: 6,
        email: 'jad',
        firstName: 'Jane',
        lastName: 'Doe',
        role: 'ROLE_ACCOUNTING'
      },
      {
        id: 7,
        email: 'mf',
        firstName: 'Morgan',
        lastName: 'Freeman',
        role: 'ROLE_EXECUTIVE'
      },
    ]
    ;
  }

  public login(credentials: Credentials): Observable<Employee> {
//    return this.httpClient.post<Employee>(`${this.apiUrl}/auth/login`, credentials);

    const employee = this.employees.find((e: Employee) => e.email === credentials.employeeId);
    return of(employee);
  }
}
