export interface Timesheet {
  id: number;
  employeeId: number;
  employeeName: string;
  hoursForWeek: number;
  approved: boolean;
  paid: boolean;
  periodEnding: string;
}
