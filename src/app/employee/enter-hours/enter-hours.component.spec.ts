import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { EnterHoursComponent } from './enter-hours.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {TimesheetListComponent} from '../timesheet-list/timesheet-list.component';
import SpyObj = jasmine.SpyObj;
import {EmployeeService} from '../services/employee.service';
import {TimesheetInfo} from '../../model/employee/timesheet-info.interface';
import {of, throwError} from 'rxjs';
import {ActivatedRoute, convertToParamMap, Router} from '@angular/router';
import {TIMESHEET_LIST_URL} from '../../app.constants';
import {Timesheet} from '../../model/employee/timesheet.interface';

describe('EnterHoursComponent', () => {
  let testee: EnterHoursComponent;
  let fixture: ComponentFixture<EnterHoursComponent>;

  const timesheetServiceSpy: SpyObj<EmployeeService> = jasmine
    .createSpyObj('EmployeeService', ['getTimesheet', 'saveTimeReport']);
  const routerSpy: SpyObj<Router> = jasmine.createSpyObj('Router', ['navigateByUrl']);

  const timesheetId = '1';
  let activatedRouteStub = {
    snapshot: {
      paramMap: convertToParamMap(
        {
          timesheetId: timesheetId
        }
      )
    }
  };

  const timesheet: Timesheet = {
    id: 1,
    employeeId: 1,
    employeeName: 'John Doe',
    departmentId: 3,
    departmentName: 'IT',
    mondayHours: 8,
    tuesdayHours: 8,
    wednesdayHours: 8,
    thursdayHours: 8,
    fridayHours: 8,
    saturdayHours: 8,
    sundayHours: 8,
    totalHours: 40,
    periodEnding: '12-07-2019'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([ { path: 'timesheet-list', component: TimesheetListComponent } ])
      ],
      declarations: [ EnterHoursComponent, TimesheetListComponent ],
      providers: [
        { provide: EmployeeService, useValue: timesheetServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    timesheetServiceSpy.getTimesheet.and.returnValue(of(timesheet));
    timesheetServiceSpy.saveTimeReport.and.returnValue(of(1));

    fixture = TestBed.createComponent(EnterHoursComponent);
    testee = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should check enter hours form initialized correctly', () => {
    expect(testee).toBeDefined();
    expect(testee.timesheetId).toEqual(timesheetId);
    expect(testee.timeTrackingForm).toBeDefined();
    expect(testee.pageLoadingCompleted).toBeTruthy();
  });

  it('should init time tracking form correctly for existing timesheet', () => {
    expect(testee.timesheetId).toEqual(timesheetId);
    expect(timesheetServiceSpy.getTimesheet).toHaveBeenCalledWith(+timesheetId);
    expect(testee.timeTrackingForm.get('departmentName').value).toEqual(timesheet.departmentName);
    expect(testee.timeTrackingForm.get('mondayHours').value).toEqual(timesheet.mondayHours);
    expect(testee.timeTrackingForm.get('tuesdayHours').value).toEqual(timesheet.tuesdayHours);
    expect(testee.timeTrackingForm.get('wednesdayHours').value).toEqual(timesheet.wednesdayHours);
    expect(testee.timeTrackingForm.get('thursdayHours').value).toEqual(timesheet.thursdayHours);
    expect(testee.timeTrackingForm.get('fridayHours').value).toEqual(timesheet.fridayHours);
    expect(testee.pageLoadingCompleted).toBeTruthy();
  });

  it('should return "false" for existing timesheet', () => {
    expect(testee.isTimesheetNew).toBeFalsy();
  });

  it('should save time report', () => {
    testee.saveTimeReport();

    expect(timesheetServiceSpy.saveTimeReport).toHaveBeenCalledWith(testee.timeTrackingForm.value);
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith(TIMESHEET_LIST_URL);
  });

  it('should fail to save report', () => {
    timesheetServiceSpy.saveTimeReport.and.returnValue(throwError('Something went wrong. Timesheet was not saved'));
    testee.saveTimeReport();

    expect(timesheetServiceSpy.saveTimeReport).toHaveBeenCalledWith(testee.timeTrackingForm.value);
    expect(routerSpy.navigateByUrl).not.toHaveBeenCalled();
  });

  it('should cancel registration', () => {
    testee.cancelTimeRegistration();

    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith(TIMESHEET_LIST_URL);
  });

  afterEach(() => {
    routerSpy.navigateByUrl.calls.reset();
    timesheetServiceSpy.getTimesheet.calls.reset();
    timesheetServiceSpy.saveTimeReport.calls.reset();
  });
});
