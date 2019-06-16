import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {LoginService} from './services/login.service';
import {of} from 'rxjs';
import {Employee} from '../model/employee.interface';
import SpyObj = jasmine.SpyObj;
import {reject, resolve} from 'q';
import {CURRENT_EMPLOYEE_KEY} from '../app.constants';
import {RouterTestingModule} from '@angular/router/testing';

let loginServiceSpy: SpyObj<LoginService>;

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const employeeMock: Employee = {
    id: 1,
    firstName: 'John Smith',
    lastName: 'Doe',
    role: 'EMPLOYEE'
  };
  loginServiceSpy = jasmine.createSpyObj('LoginService', ['login']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule,
        RouterTestingModule.withRoutes([{path: 'timesheet-list', component: LoginComponent}]),
        HttpClientModule],
      providers: [{provide: LoginService, useValue: loginServiceSpy}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    loginServiceSpy.login.calls.reset();
    loginServiceSpy.login.and.returnValue(resolve(employeeMock));

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should check login form is initialized', () => {
    const signInForm = component.signInForm;

    expect(signInForm).toBeDefined();
    expect(signInForm.get('employeeId').value).toBe('');
    expect(signInForm.get('password').value).toBe('');
  });

  it('should log in successfully', () => {
/*    loginServiceSpy.login.and.returnValue(resolve(employeeMock));*/
    component.login();

    expect(loginServiceSpy.login).toHaveBeenCalledWith({employeeId: '', password: ''});
    expect(loginServiceSpy.login.calls.count())
      .toBe(1, 'LoginService.login() was called once');
    expect(JSON.parse(localStorage.getItem(CURRENT_EMPLOYEE_KEY))).toEqual(employeeMock);
  });

  xit('should fail to log in user', () => {
    loginServiceSpy.login.and.returnValue(reject('Wrong username or password'));

    component.login();

    expect(loginServiceSpy.login).toHaveBeenCalledWith({employeeId: '', password: ''});
    expect(loginServiceSpy.login.calls.count())
      .toBe(1, 'LoginService.login() was called once');
    expect(localStorage.getItem(CURRENT_EMPLOYEE_KEY)).toBeNull();
  });
});
