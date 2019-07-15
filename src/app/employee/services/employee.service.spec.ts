import {HttpClient} from '@angular/common/http';
import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Timesheet} from '../../model/employee/timesheet.interface';
import {EmployeeService} from './employee.service';
import {environment} from '../../../environments/environment';
import {timesheet} from '../../app.constants';

describe('EmployeeService Unit Test', () => {
  let testee: EmployeeService;

  let apiUrl;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  const timesheets: Timesheet[] = [timesheet];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        EmployeeService,
        { provide: 'apiUrl', useValue: environment.apiUrl }
      ]
    });

    testee = TestBed.get(EmployeeService);
    apiUrl = TestBed.get('apiUrl');
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should get employee timesheets', () => {
    testee
      .getEmployeeTimesheets(timesheets[0].employeeId)
      .subscribe((response: Timesheet[]) => {
        expect(response).toEqual(timesheets);
      });

    const performedRequest = httpTestingController.expectOne(`${apiUrl}/assets/timesheets.json`);
    expect(performedRequest.request.method).toEqual('GET');
    performedRequest.flush(timesheets);
  });

  it('should get timesheet', () => {
    testee
      .getTimesheet(timesheet.id)
      .subscribe((response: Timesheet) => {
        expect(timesheet).toEqual(response);
      });

    const performedRequest = httpTestingController.expectOne(`${apiUrl}/timesheet-info/${timesheet.id}`);
    expect(performedRequest.request.method).toEqual('GET');
    performedRequest.flush(timesheet);
  });

  it('should save time report', () => {
    testee
      .saveTimeReport(timesheet)
      .subscribe((id: number) => {
        expect(id).toBe(1);
      });

    const performedRequest = httpTestingController.expectOne(`${apiUrl}/timesheet-info`);
    expect(performedRequest.request.method).toEqual('POST');
    performedRequest.flush(1);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
