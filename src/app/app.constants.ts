import {StaffHoursReport} from './model/manager/staff-hours.report.interface';
import {Timesheet} from './model/employee/timesheet.interface';

export const SIGN_IN_URL = '/login';
export const TIMESHEET_LIST_URL = '/timesheet-list';
export const ENTER_HOURS_URL = '/enter-hours';
export const STAFF_HOURS_REPORT_URL = '/staff-hours-report';
export const APPROVE_TIMESHEETS_URL = '/approve-timesheets';
export const OVERALL_SUMMARY_URL = 'overall-summary';
export const MARK_PAID_URL = 'mark-paid';
export const SIGN_IN_HEADING = 'Sign In';
export const TIMESHEET_LIST_HEADING = 'Timesheet list';
export const ENTER_HOURS_HEADING = 'Enter Hours';
export const STAFF_HOURS_REPORT_HEADING = 'Report: Staff Hours';
export const APPROVE_TIMESHEETS_HEADING = 'Approve Timesheets';
export const OVERALL_SUMMARY_HEADING = 'Overall Summary';
export const MARK_PAID_HEADING = 'Mark Paid';
export const CURRENT_EMPLOYEE_KEY = 'currentEmployee';

export const ROLE_EMPLOYEE = 'ROLE_EMPLOYEE';
export const ROLE_MANAGER = 'ROLE_MANAGER';
export const ROLE_EXECUTIVE = 'ROLE_EXECUTIVE';
export const ROLE_ACCOUNTING = 'ROLE_ACCOUNTING';

export const timesheet: Timesheet = {
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

export const staffHourReports: StaffHoursReport[] = [
  {
    employeeName: 'John Smith',
    departmentName: 'Staff',
    hoursForWeek: 65.0,
    timesheetId: 1,
    approved: undefined,
    markPaid: false
  },
  {
    employeeName: 'Kishore Kumar',
    departmentName: 'Management',
    hoursForWeek: 40.0,
    timesheetId: 2,
    approved: undefined,
    markPaid: false
  },
  {
    employeeName: 'Ying Lee',
    departmentName: 'Staff',
    hoursForWeek: 37.0,
    timesheetId: 3,
    approved: undefined,
    markPaid: false
  },
  {
    employeeName: 'Zavadi Johari',
    departmentName: 'QA',
    hoursForWeek: 37.5,
    timesheetId: 4,
    approved: undefined,
    markPaid: false
  }
];
