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

  public updateReports(reports: StaffHoursReport[]): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/reports/1`, reports);
  }

  loadCurrentWeekSummaryReports() {
    return this.httpClient.get(`${this.apiUrl}/summaryReports`);
  }
}
