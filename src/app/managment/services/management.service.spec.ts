import {staffHourReports, summaryReports, timesheet} from '../../app.constants';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from '../../../environments/environment';
import {TestBed} from '@angular/core/testing';
import {HttpClient} from '@angular/common/http';
import {ManagementService} from './management.service';
import {StaffHoursReport} from '../../model/manager/staff-hours.report.interface';
import {OverallSummaryReport} from '../../model/executive/overall-summary.interface';

describe('ManagementService Unit Test', () => {
  let testee: ManagementService;

  let apiUrl;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  const reports: StaffHoursReport[] = staffHourReports;
  const overallSummaryReports: OverallSummaryReport[] = summaryReports;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ManagementService,
        { provide: 'apiUrl', useValue: environment.apiUrl }
      ]
    });

    testee = TestBed.get(ManagementService);
    apiUrl = TestBed.get('apiUrl');
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should get employee timesheets', () => {
    testee
      .loadCurrentWeekReports()
      .subscribe((response: StaffHoursReport[]) => {
        expect(response).toEqual(reports);
      });

    const performedRequest = httpTestingController.expectOne(`${apiUrl}/reports`);
    expect(performedRequest.request.method).toEqual('GET');
    performedRequest.flush(reports);
  });

  it('should approve time reports', () => {
    testee
      .updateReports(staffHourReports)
      .subscribe(response => {
        expect(response).toBeDefined();
      });

    const performedRequest = httpTestingController.expectOne(`${apiUrl}/reports/1`);
    expect(performedRequest.request.method).toEqual('PUT');
    performedRequest.flush(staffHourReports);
  });

  it('should get overall summary reports', () => {
    testee
      .loadCurrentWeekSummaryReports()
      .subscribe((response: OverallSummaryReport[]) => {
        expect(response).toEqual(overallSummaryReports);
      });

    const performedRequest = httpTestingController.expectOne(`${apiUrl}/summaryReports`);
    expect(performedRequest.request.method).toEqual('GET');
    performedRequest.flush(overallSummaryReports);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
