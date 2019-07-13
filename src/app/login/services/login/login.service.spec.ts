import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {Credentials} from '../../../model/auth/credentials.interface';
import {Employee} from '../../../model/auth/employee.interface';

describe('LoginService test spec', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  const credentials: Credentials = {employeeId: 'john.doe@mail.com', password: 'secret'};
  const johnDoe: Employee = {
    id: 1,
    email: 'john.doe@mail.com',
    firstName: 'John Smith',
    lastName: 'Doe',
    role: 'ROLE_EMPLOYEE'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should login user', () => {
    httpClient
      .post<Employee>('/auth/login', credentials)
      .subscribe((employee: Employee) => {
        expect(employee).toEqual(johnDoe);
      });

    const performedRequest = httpTestingController.expectOne('/auth/login');
    expect(performedRequest.request.method).toEqual('POST');

    performedRequest.flush(johnDoe);
  });

  it('should fail to log in user', () => {
    const errorMessage = '401 Unauthorized Error';

    httpClient.post<Employee>('/auth/login', credentials)
      .subscribe(
        response => fail('Should fail with unauthorized response'),
        (error: HttpErrorResponse) => {
          expect(error.status).toEqual(401);
          expect(error.error).toEqual(errorMessage);
        });

    const performedRequest = httpTestingController.expectOne('/auth/login');
    performedRequest.flush(errorMessage, {status: 401, statusText: 'User is not authorized'});
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
