import {Inject, Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {StaffHoursReport} from '../../model/manager/staff-hours.report.interface';
import {HttpClient} from '@angular/common/http';
import {staffHourReports} from '../../app.constants';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {
  constructor(@Inject('apiUrl') private apiUrl: string, private httpClient: HttpClient) {}

  public loadCurrentWeekReports(): Observable<StaffHoursReport[]> {
//    return of(staffHourReports);
    return this.httpClient.get<StaffHoursReport[]>(`${this.apiUrl}/current-week-reports`);
  }

  public approveTimesheets(reports: StaffHoursReport[]): Observable<any> {
//    return of(reports);
    return this.httpClient.post(`${this.apiUrl}/timesheets/approve`, reports);
  }
}
