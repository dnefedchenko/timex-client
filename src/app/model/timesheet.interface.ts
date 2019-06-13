export interface Timesheet {
  id: number;
  employeeId: number;
  employeeName: number;
  hoursForWeek: number;
  approved: boolean;
  paid: boolean;
  periodEnding: string;
}
