import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffHoursReportComponent } from './staff-hours-report.component';
import {RouterTestingModule} from '@angular/router/testing';
import {ApproveTimesheetsComponent} from '../approve-timesheets/approve-timesheets.component';
import SpyObj = jasmine.SpyObj;
import {Router} from '@angular/router';
import {APPROVE_TIMESHEETS_URL} from '../../app.constants';
import {ManagementService} from '../services/management.service';
import {of} from 'rxjs';
import {StaffHoursReport} from '../../model/manager/staff-hours.report.interface';

describe('StaffHoursReportComponent', () => {
  let testee: StaffHoursReportComponent;
  let fixture: ComponentFixture<StaffHoursReportComponent>;

  let routerSpy: SpyObj<Router> = jasmine.createSpyObj('Router', ['navigateByUrl']);
  let managementServiceSpy: SpyObj<ManagementService> =
    jasmine.createSpyObj('ManagementService', ['loadCurrentWeekReports']);

  const reports: StaffHoursReport[] = [
    {
      employeeName: 'John Smith',
      departmentType: 'Staff',
      hoursForWeek: 65.0,
      timesheetId: 1,
      approved: false
    },
    {
      employeeName: 'Kishore Kumar',
      departmentType: 'Management',
      hoursForWeek: 40.0,
      timesheetId: 1,
      approved: false
    },
    {
      employeeName: 'Ying Lee',
      departmentType: 'Staff',
      hoursForWeek: 37.0,
      timesheetId: 1,
      approved: false
    },
    {
      employeeName: 'Zavadi Johari',
      departmentType: 'QA',
      hoursForWeek: 37.5,
      timesheetId: 1,
      approved: false
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffHoursReportComponent, ApproveTimesheetsComponent ],
      imports: [
        RouterTestingModule.withRoutes([
          {path: 'approve-timesheets', component: ApproveTimesheetsComponent}
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
