import {TestBed, async, inject, ComponentFixture} from '@angular/core/testing';

import { AuthorizedGuard } from './authorized.guard';
import {RouterTestingModule} from '@angular/router/testing';
import {Router, RouterStateSnapshot} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './login/services/auth/auth.service';
import SpyObj = jasmine.SpyObj;
import {
  APPROVE_TIMESHEETS_URL,
  ENTER_HOURS_URL,
  MARK_PAID_URL,
  OVERALL_SUMMARY_URL,
  STAFF_HOURS_REPORT_URL,
  TIMESHEET_LIST_URL
} from './app.constants';

describe('AuthorizedGuard', () => {
  let testee: AuthorizedGuard;

  const authServiceSpy: SpyObj<AuthService> = jasmine.createSpyObj('AuthService',
    ['isAuthorized','isEmployee', 'isManager', 'isExecutive', 'isAccountant']
  );
  const routerSpy: SpyObj<Router> = jasmine.createSpyObj('Router', ['navigateByUrl']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([{path: 'login', component: LoginComponent}])
      ],
      declarations: [
        LoginComponent
      ],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: AuthService, useValue: authServiceSpy },
        AuthorizedGuard
      ]
    });
  });

  beforeEach(() => {
    testee = TestBed.get(AuthorizedGuard);

    routerSpy.navigateByUrl.calls.reset();
    authServiceSpy.isAuthorized.calls.reset();
    authServiceSpy.isEmployee.calls.reset();
    authServiceSpy.isManager.calls.reset();
    authServiceSpy.isExecutive.calls.reset();
    authServiceSpy.isAccountant.calls.reset();
  });

  it('should check guard is initialized', () => {
    expect(testee).toBeDefined();
  });

  it('should not activate route if user is not authorized', () => {
    authServiceSpy.isAuthorized.and.returnValue(false);
    const canActivate = testee.canActivate(null, {url: TIMESHEET_LIST_URL, root: null});
    expect(canActivate).toBeFalsy();
  });

  it('should activate "timesheet-list" url for authenticated employee role', () => {
    authServiceSpy.isAuthorized.and.returnValue(true);
    authServiceSpy.isEmployee.and.returnValue(true);

    const canActivateTimesheetListUrl = testee.canActivate(null, {url: TIMESHEET_LIST_URL, root: null});

    expect(canActivateTimesheetListUrl).toBeTruthy();
    expect(authServiceSpy.isAuthorized).toHaveBeenCalled();
    expect(authServiceSpy.isEmployee).toHaveBeenCalled();
    expect(routerSpy.navigateByUrl).not.toHaveBeenCalled();
  });

  it('should activate "enter-hours" url for authenticated employee role', () => {
    authServiceSpy.isAuthorized.and.returnValue(true);
    authServiceSpy.isEmployee.and.returnValue(true);

    const canActivateHoursUrl = testee.canActivate(null, {url: ENTER_HOURS_URL, root: null});

    expect(canActivateHoursUrl).toBeTruthy();
    expect(authServiceSpy.isAuthorized).toHaveBeenCalled();
    expect(authServiceSpy.isEmployee).toHaveBeenCalled();
    expect(routerSpy.navigateByUrl).not.toHaveBeenCalled();
  });

  it('should redirect authenticated NOT employees to not-found-page', () => {
    authServiceSpy.isAuthorized.and.returnValue(true);
    authServiceSpy.isEmployee.and.returnValue(false);

    const canActivateHoursUrl = testee.canActivate(null, {url: ENTER_HOURS_URL, root: null});

    expect(canActivateHoursUrl).toBeFalsy();
    expect(authServiceSpy.isAuthorized).toHaveBeenCalled();
    expect(authServiceSpy.isEmployee).toHaveBeenCalled();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('page-not-found');
  });

  it('should activate "staff-hours" url for authenticated manager role', () => {
    authServiceSpy.isAuthorized.and.returnValue(true);
    authServiceSpy.isManager.and.returnValue(true);

    const canActivateStaffHoursReportUrl = testee.canActivate(null, {url: STAFF_HOURS_REPORT_URL, root: null});

    expect(canActivateStaffHoursReportUrl).toBeTruthy();
    expect(authServiceSpy.isAuthorized).toHaveBeenCalled();
    expect(authServiceSpy.isManager).toHaveBeenCalled();
    expect(routerSpy.navigateByUrl).not.toHaveBeenCalled();
  });

  it('should activate "approve-timesheets" url for authenticated manager role', () => {
    authServiceSpy.isAuthorized.and.returnValue(true);
    authServiceSpy.isManager.and.returnValue(true);

    const approveTimesheetUrl = testee.canActivate(null, {url: APPROVE_TIMESHEETS_URL, root: null});

    expect(approveTimesheetUrl).toBeTruthy();
    expect(authServiceSpy.isAuthorized).toHaveBeenCalled();
    expect(authServiceSpy.isManager).toHaveBeenCalled();
    expect(routerSpy.navigateByUrl).not.toHaveBeenCalled();
  });

  it('should redirect authenticated NOT managers to not-found-page', () => {
    authServiceSpy.isAuthorized.and.returnValue(true);
    authServiceSpy.isManager.and.returnValue(false);

    const canActivateTimesheetsUrl = testee.canActivate(null, {url: APPROVE_TIMESHEETS_URL, root: null});

    expect(canActivateTimesheetsUrl).toBeFalsy();
    expect(authServiceSpy.isAuthorized).toHaveBeenCalled();
    expect(authServiceSpy.isManager).toHaveBeenCalled();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('page-not-found');
  });

  it('should activate "overall-summary" url for authenticated executive role', () => {
    authServiceSpy.isAuthorized.and.returnValue(true);
    authServiceSpy.isExecutive.and.returnValue(true);

    const canActivateOverallSummaryUrl = testee.canActivate(null, {url: OVERALL_SUMMARY_URL, root: null});

    expect(canActivateOverallSummaryUrl).toBeTruthy();
    expect(authServiceSpy.isAuthorized).toHaveBeenCalled();
    expect(authServiceSpy.isExecutive).toHaveBeenCalled();
    expect(routerSpy.navigateByUrl).not.toHaveBeenCalled();
  });

  it('should redirect authenticated NOT executives to not-found-page', () => {
    authServiceSpy.isAuthorized.and.returnValue(true);
    authServiceSpy.isExecutive.and.returnValue(false);

    const canActivateOverallSummaryUrl = testee.canActivate(null, {url: OVERALL_SUMMARY_URL, root: null});

    expect(canActivateOverallSummaryUrl).toBeFalsy();
    expect(authServiceSpy.isAuthorized).toHaveBeenCalled();
    expect(authServiceSpy.isExecutive).toHaveBeenCalled();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('page-not-found');
  });

  it('should activate "mark-paid" url for authenticated accountant role', () => {
    authServiceSpy.isAuthorized.and.returnValue(true);
    authServiceSpy.isAccountant.and.returnValue(true);

    const canActivateMarkPaidUrl = testee.canActivate(null, {url: MARK_PAID_URL, root: null});

    expect(canActivateMarkPaidUrl).toBeTruthy();
    expect(authServiceSpy.isAuthorized).toHaveBeenCalled();
    expect(authServiceSpy.isAccountant).toHaveBeenCalled();
    expect(routerSpy.navigateByUrl).not.toHaveBeenCalled();
  });

  it('should redirect authenticated NOT accountants to not-found-page', () => {
    authServiceSpy.isAuthorized.and.returnValue(true);
    authServiceSpy.isAccountant.and.returnValue(false);

    const canActivateMarkPaidUrl = testee.canActivate(null, {url: MARK_PAID_URL, root: null});

    expect(canActivateMarkPaidUrl).toBeFalsy();
    expect(authServiceSpy.isAuthorized).toHaveBeenCalled();
    expect(authServiceSpy.isAccountant).toHaveBeenCalled();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('page-not-found');
  });
});
