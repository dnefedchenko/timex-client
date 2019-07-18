import {OverallStatus} from './overall-status.interface';

export interface OverallSummaryReport {
  managerName: string;
  hoursForWeek: number;
  status: OverallStatus;
}
