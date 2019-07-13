import {AuthService} from './auth.service';
import {CURRENT_EMPLOYEE_KEY, ROLE_ACCOUNTING, ROLE_EMPLOYEE, ROLE_EXECUTIVE, ROLE_MANAGER} from '../../../app.constants';
import {Employee} from '../../../model/auth/employee.interface';

describe('AuthService unit test', () => {
  let testee: AuthService;
  const johnDoe: Employee = {
    id: 1,
    email: 'john.doe@mail.com',
    firstName: 'John Smith',
    lastName: 'Doe',
    role: 'ROLE_EMPLOYEE'
  };

  beforeEach(() => {
    testee = new AuthService();
  });

  it('should set current employee', () => {
    expect(localStorage.getItem(CURRENT_EMPLOYEE_KEY)).toBeNull();
    testee.setCurrentEmployee(johnDoe);
    expect(JSON.parse(localStorage.getItem(CURRENT_EMPLOYEE_KEY))).toEqual(johnDoe);
  });

  it('should get current employee', () => {
    expect(localStorage.getItem(CURRENT_EMPLOYEE_KEY)).toBeNull();
    localStorage.setItem(CURRENT_EMPLOYEE_KEY, JSON.stringify(johnDoe));
    expect(testee.getCurrentEmployee()).toEqual(johnDoe);
  });

  it('should clear local storage', () => {
    testee.setCurrentEmployee(johnDoe);
    expect(localStorage.length).toBe(1);

    testee.clear();
    expect(localStorage.length).toBe(0);
  });

  it('should return "false" if user is not authorized', () => {
    localStorage.clear();
    expect(testee.isAuthorized()).toBeFalsy();
  });

  it('should return "true" if user is authorized', () => {
    localStorage.setItem(CURRENT_EMPLOYEE_KEY, JSON.stringify(johnDoe));
    expect(testee.isAuthorized()).toBeTruthy();
  });

  it('should return "true" if user is in role "ROLE_EMPLOYEE" ', () => {
    johnDoe.role = ROLE_EMPLOYEE;
    localStorage.setItem(CURRENT_EMPLOYEE_KEY, JSON.stringify(johnDoe));

    expect(testee.isEmployee()).toBeTruthy();
    expect(testee.isManager()).toBeFalsy();
    expect(testee.isExecutive()).toBeFalsy();
    expect(testee.isAccountant()).toBeFalsy();
  });

  it('should return "true" if user is in role "ROLE_MANAGER" ', () => {
    johnDoe.role = ROLE_MANAGER;
    localStorage.setItem(CURRENT_EMPLOYEE_KEY, JSON.stringify(johnDoe));

    expect(testee.isManager()).toBeTruthy();
    expect(testee.isEmployee()).toBeFalsy();
    expect(testee.isExecutive()).toBeFalsy();
    expect(testee.isAccountant()).toBeFalsy();
  });

  it('should return "true" if user is in role "ROLE_EXECUTIVE" ', () => {
    johnDoe.role = ROLE_EXECUTIVE;
    localStorage.setItem(CURRENT_EMPLOYEE_KEY, JSON.stringify(johnDoe));

    expect(testee.isExecutive()).toBeTruthy();
    expect(testee.isEmployee()).toBeFalsy();
    expect(testee.isManager()).toBeFalsy();
    expect(testee.isAccountant()).toBeFalsy();
  });

  it('should return "true" if user is in role "ROLE_ACCOUNTANT" ', () => {
    johnDoe.role = ROLE_ACCOUNTING;
    localStorage.setItem(CURRENT_EMPLOYEE_KEY, JSON.stringify(johnDoe));

    expect(testee.isAccountant()).toBeTruthy();
    expect(testee.isEmployee()).toBeFalsy();
    expect(testee.isExecutive()).toBeFalsy();
    expect(testee.isManager()).toBeFalsy();
  });

  afterEach(() => {
    localStorage.clear();
  });
});
