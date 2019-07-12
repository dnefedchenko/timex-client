export interface Timesheet {
  id: number;
  employeeId: string;
  employeeName: string;
  hoursForWeek: number;
  approved: boolean;
  paid: boolean;
  periodEnding: string;
}
