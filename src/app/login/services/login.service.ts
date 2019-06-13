import {Employee} from '../../model/employee.interface';
import {Credentials} from '../../model/credentials.interface';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Promise, resolve} from 'q';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  public login(credentials: Credentials): any {
    return Promise<Employee>(resolve => {
      resolve( {
        id: 1,
        firstName: 'John Smith',
        lastName: 'Doe',
        role: 'EMPLOYEE'
      });
    });
  }
}
