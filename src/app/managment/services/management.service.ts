import {Inject, Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {StaffHoursReport} from '../../model/manager/staff-hours.report.interface';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {
  private reports: StaffHoursReport[] = [
    {
      employeeName: 'John Smith',
      departmentName: 'Staff',
      hoursForWeek: 65.0,
      timesheetId: 1,
      approved: undefined
    },
    {
      employeeName: 'Kishore Kumar',
      departmentName: 'Management',
      hoursForWeek: 40.0,
      timesheetId: 2,
      approved: undefined
    },
    {
      employeeName: 'Ying Lee',
      departmentName: 'Staff',
      hoursForWeek: 37.0,
      timesheetId: 3,
      approved: undefined
    },
    {
      employeeName: 'Zavadi Johari',
      departmentName: 'QA',
      hoursForWeek: 37.5,
      timesheetId: 4,
      approved: undefined
    }
  ];

  constructor(@Inject('apiUrl') private apiUrl: string, private httpClient: HttpClient) {}

  public loadCurrentWeekReports(): Observable<StaffHoursReport[]> {
    return of(this.reports);
//    return this.httpClient.get(`${this.apiUrl}/current-week-reports`);
  }

  public approveTimesheets(reports: StaffHoursReport[]): Observable<any> {
    return of(reports);
//    return this.httpClient.post(`${this.apiUrl}/timesheets/approve`, reports);
  }
}
