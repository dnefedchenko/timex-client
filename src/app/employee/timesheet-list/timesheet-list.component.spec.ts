import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { TimesheetListComponent } from './timesheet-list.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import SpyObj = jasmine.SpyObj;
import {AuthService} from '../../login/services/auth/auth.service';
import {TimesheetService} from '../services/timesheet.service';
import {Employee} from '../../model/employee.interface';
import {of} from 'rxjs';
import {Timesheet} from '../../model/timesheet.interface';

describe('TimesheetListComponent', () => {
  let component: TimesheetListComponent;
  let fixture: ComponentFixture<TimesheetListComponent>;

  const authServiceSpy: SpyObj<AuthService> = jasmine.createSpyObj('AuthService', ['getCurrentEmployee']);
  const timesheetServiceSpy: SpyObj<TimesheetService> = jasmine.createSpyObj('TimesheetService', ['getEmployeeTimesheets']);

  const johnDoe: Employee = {
    id: 1,
    email: 'john.doe@mail.com',
    firstName: 'John Smith',
    lastName: 'Doe',
    role: 'ROLE_EMPLOYEE'
  };

  const timesheets: Timesheet[] = [
    {
      id: 1,
      employeeId: 'john.doe@mail.com',
      employeeName: 'John',
      hoursForWeek: 40,
      periodEnding: '12-07-2019',
      approved: true,
      paid: true
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [ TimesheetListComponent ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: TimesheetService, useValue: timesheetServiceSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    authServiceSpy.getCurrentEmployee.and.returnValue(johnDoe);
    timesheetServiceSpy.getEmployeeTimesheets.and.returnValue(of(timesheets));

    fixture = TestBed.createComponent(TimesheetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch employee timesheets', fakeAsync( () => {
    expect(authServiceSpy.getCurrentEmployee).toHaveBeenCalled();
    expect(component.employeeTimesheets.length).toBe(1);
    expect(component.employeeTimesheets).toEqual(timesheets);
  }));
});
