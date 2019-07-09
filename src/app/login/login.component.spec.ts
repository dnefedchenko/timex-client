import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {LoginService} from './services/login.service';
import {Employee} from '../model/employee.interface';
import SpyObj = jasmine.SpyObj;
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService} from './services/auth.service';
import {of, throwError} from 'rxjs';

let loginServiceSpy: SpyObj<LoginService>;
let authServiceSpy: SpyObj<AuthService>;

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const employeeMock: Employee = {
    id: 1,
    email: 'john.doe@mail.com',
    firstName: 'John Smith',
    lastName: 'Doe',
    role: 'ROLE_EMPLOYEE'
  };

  loginServiceSpy = jasmine.createSpyObj('LoginService', ['login']);
  authServiceSpy = jasmine.createSpyObj('AuthService', ['setCurrentEmployee', 'clear']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule,
        RouterTestingModule.withRoutes([{path: 'timesheet-list', component: LoginComponent}]),
        HttpClientModule],
      providers: [
        {provide: LoginService, useValue: loginServiceSpy},
        {provide: AuthService, useValue: authServiceSpy}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    loginServiceSpy.login.calls.reset();
    loginServiceSpy.login.and.returnValue(of(employeeMock));

    authServiceSpy.setCurrentEmployee.calls.reset();
    authServiceSpy.clear.calls.reset();

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
    component.login();

    expect(loginServiceSpy.login).toHaveBeenCalledWith({employeeId: '', password: ''});
    expect(loginServiceSpy.login.calls.count());
    expect(authServiceSpy.setCurrentEmployee).toHaveBeenCalledWith(employeeMock);
  });

  it('should fail to log in user', () => {
    loginServiceSpy.login.and.returnValue(throwError('Wrong username or password'));

    component.login();

    expect(loginServiceSpy.login).toHaveBeenCalledWith({employeeId: '', password: ''});
    expect(authServiceSpy.setCurrentEmployee).not.toHaveBeenCalled();
    expect(authServiceSpy.clear).toHaveBeenCalled();
  });
});
