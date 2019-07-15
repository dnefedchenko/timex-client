import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffHoursReportComponent } from './staff-hours-report.component';
import {RouterTestingModule} from '@angular/router/testing';
import SpyObj = jasmine.SpyObj;
import {Router} from '@angular/router';
import {APPROVE_TIMESHEETS_URL, staffHourReports} from '../../app.constants';
import {ManagementService} from '../services/management.service';
import {of} from 'rxjs';
import {StaffHoursReport} from '../../model/manager/staff-hours.report.interface';

describe('StaffHoursReportComponent', () => {
  let testee: StaffHoursReportComponent;
  let fixture: ComponentFixture<StaffHoursReportComponent>;

  const routerSpy: SpyObj<Router> = jasmine.createSpyObj('Router', ['navigateByUrl']);
  const managementServiceSpy: SpyObj<ManagementService> =
    jasmine.createSpyObj('ManagementService', ['loadCurrentWeekReports']);

  const reports: StaffHoursReport[] = staffHourReports;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffHoursReportComponent ],
      imports: [
        RouterTestingModule.withRoutes([
          {path: 'approve-timesheets', redirectTo: 'staff-hours-report'}
        ])
      ],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ManagementService, useValue: managementServiceSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    managementServiceSpy.loadCurrentWeekReports.and.returnValue(of(reports));

    fixture = TestBed.createComponent(StaffHoursReportComponent);
    testee = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should check component initialized correctly', () => {
    expect(testee).toBeDefined();
    expect(managementServiceSpy.loadCurrentWeekReports.calls.count()).toBe(1);
    expect(testee.averageHours).toBe(44.88);
    expect(testee.totalHours).toBe(179.5);
    expect(testee.reports).toEqual(reports);
  });

  it('should navigate to timesheets apporval page', () => {
    testee.goToApprovalPage();

    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith(APPROVE_TIMESHEETS_URL);
  });
});
