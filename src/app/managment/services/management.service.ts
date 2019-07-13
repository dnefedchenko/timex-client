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
      departmentType: 'Staff',
      hoursForWeek: 65.0,
      timesheetId: 1,
      approved: false
    },
    {
      employeeName: 'Kishore Kumar',
      departmentType: 'Management',
      hoursForWeek: 40.0,
      timesheetId: 1,
      approved: false
    },
    {
      employeeName: 'Ying Lee',
      departmentType: 'Staff',
      hoursForWeek: 37.0,
      timesheetId: 1,
      approved: false
    },
    {
      employeeName: 'Zavadi Johari',
      departmentType: 'QA',
      hoursForWeek: 37.5,
      timesheetId: 1,
      approved: false
    }
  ];

  constructor(@Inject('apiUrl') private apiUrl: string, private httpClient: HttpClient) {}

  public loadCurrentWeekReports(): Observable<StaffHoursReport[]> {
    return of(this.reports);
//    return this.httpClient.get(`${this.apiUrl}/current-week-reports`);
  }
}
