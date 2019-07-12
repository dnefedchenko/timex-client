import {HttpClient} from '@angular/common/http';
import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Timesheet} from '../../model/timesheet.interface';
import {TimesheetInfo} from '../../model/timesheet-info.interface';
import {TimesheetService} from './timesheet.service';
import {environment} from '../../../environments/environment';

describe('TimesheetService Unit Test', () => {
  let testee: TimesheetService;

  let apiUrl;
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
      imports: [HttpClientTestingModule],
      providers: [
        TimesheetService,
        { provide: 'apiUrl', useValue: environment.apiUrl }
      ]
    });

    testee = TestBed.get(TimesheetService);
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

  it('should get timesheet info', () => {
    testee
      .getTimesheetInfo(timesheetInfo.id)
      .subscribe((info: TimesheetInfo) => {
        expect(info).toEqual(timesheetInfo);
      });

    const performedRequest = httpTestingController.expectOne(`${apiUrl}/timesheet-info/${timesheetInfo.id}`);
    expect(performedRequest.request.method).toEqual('GET');
    performedRequest.flush(timesheetInfo);
  });

  it('should save time report', () => {
    testee
      .saveTimeReport(timesheetInfo)
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
