export interface Timesheet {
  id: number;
  employeeId: number;
  employeeName: string;
  departmentId: number;
  departmentName: string;
  mondayHours: number;
  tuesdayHours: number;
  wednesdayHours: number;
  thursdayHours: number;
  fridayHours: number;
  saturdayHours: number;
  sundayHours: number;
  totalHours: number;
  periodEnding: string;
}
