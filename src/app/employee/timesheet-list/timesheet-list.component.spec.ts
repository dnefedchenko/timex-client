import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { TimesheetListComponent } from './timesheet-list.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import SpyObj = jasmine.SpyObj;
import {AuthService} from '../../login/services/auth/auth.service';
import {EmployeeService} from '../services/employee.service';
import {Employee} from '../../model/auth/employee.interface';
import {of} from 'rxjs';
import {Timesheet} from '../../model/employee/timesheet.interface';
import {timesheet} from '../../app.constants';

describe('TimesheetListComponent', () => {
  let component: TimesheetListComponent;
  let fixture: ComponentFixture<TimesheetListComponent>;

  const authServiceSpy: SpyObj<AuthService> = jasmine.createSpyObj('AuthService', ['getCurrentEmployee']);
  const timesheetServiceSpy: SpyObj<EmployeeService> = jasmine.createSpyObj('EmployeeService', ['getEmployeeTimesheets']);

  const johnDoe: Employee = {
    id: 1,
    email: 'john.doe@mail.com',
    firstName: 'John Smith',
    lastName: 'Doe',
    role: 'ROLE_EMPLOYEE'
  };

  const timesheets: Timesheet[] = [timesheet];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [ TimesheetListComponent ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: EmployeeService, useValue: timesheetServiceSpy }
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
