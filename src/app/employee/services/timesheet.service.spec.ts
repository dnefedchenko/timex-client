import {HttpClient} from '@angular/common/http';
import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Timesheet} from '../../model/timesheet.interface';

describe('TimesheetService Unit Test', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  const timesheets: Timesheet[] = [
    {
      id: 1,
      employeeId: 123,
      employeeName: 'John',
      hoursForWeek: 40,
      periodEnding: '12-07-2019',
      approved: true,
      paid: true
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should get employee timesheets', () => {
    httpClient
      .get<Timesheet[]>(`/employee/1/timesheets`)
      .subscribe((response: Timesheet[]) => {
        expect(response).toEqual(timesheets);
      });

    const performedRequest = httpTestingController.expectOne('/employee/1/timesheets');
    expect(performedRequest.request.method).toEqual('GET');

    performedRequest.flush(timesheets);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
