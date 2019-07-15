export interface StaffHoursReport {
  employeeName: string;
  departmentName: string;
  hoursForWeek: number;
  timesheetId: number;
  approved: boolean;
  markPaid: boolean;
}
