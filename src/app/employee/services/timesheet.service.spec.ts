import {HttpClient} from '@angular/common/http';
import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Timesheet} from '../../model/timesheet.interface';
import {TimesheetInfo} from '../../model/timesheet-info.interface';
import {TimesheetService} from './timesheet.service';

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

  const timesheetInfo: TimesheetInfo = {
    id: 1,
    departmentId: 3,
    departmentName: 'IT',
    mondayHours: 8,
    tuesdayHours: 8,
    wednesdayHours: 8,
    thursdayHours: 8,
    fridayHours: 8,
    saturdayHours: 8,
    sundayHours: 8,
    totalHours: 40
  };

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

  it('should get timesheet info', () => {
    httpClient
      .get<TimesheetInfo>('timesheet-info/1')
      .subscribe((info: TimesheetInfo) => {
        expect(info).toEqual(timesheetInfo);
      });

    const performedRequest = httpTestingController.expectOne('timesheet-info/1');
    expect(performedRequest.request.method).toEqual('GET');
    performedRequest.flush(timesheetInfo);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
