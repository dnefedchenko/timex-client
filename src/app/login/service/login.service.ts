import {Employee} from '../../model/employee.interface';
import {Credentials} from '../../model/credentials.interface';
import {Injectable} from '@angular/core';
import {Promise} from 'q';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor() {}

  public login(credentials: Credentials): Promise<Employee> {
    const employee = {id: 1234, firstName: 'John', lastName: 'Doe', role: 'EMPLOYEE'};
    return Promise<Employee>(resolve => {
      resolve(employee);
    });
  }
}
