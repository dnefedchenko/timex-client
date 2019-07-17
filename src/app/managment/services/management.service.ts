import {Inject, Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {StaffHoursReport} from '../../model/manager/staff-hours.report.interface';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {
  constructor(@Inject('apiUrl') private apiUrl: string, private httpClient: HttpClient) {}

  public loadCurrentWeekReports(): Observable<StaffHoursReport[]> {
    return this.httpClient.get<StaffHoursReport[]>(`${this.apiUrl}/reports`);
  }

  public updateTimesheets(reports: StaffHoursReport[]): Observable<any> {
    return of(reports);
//    return this.httpClient.put(`${this.apiUrl}/timesheets`, reports);
  }
}
