import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Timesheet} from '../../model/timesheet.interface';
import {TimesheetInfo} from '../../model/timesheet-info.interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(@Inject('apiUrl') private apiUrl: string, private httpClient: HttpClient) {}

  public getEmployeeTimesheets(employeeId: number): Observable<Timesheet[]> {
    return this.httpClient.get<Timesheet[]>(`${this.apiUrl}/assets/timesheets.json`);
  }

  public getTimesheetInfo(id: number) {
    return this.httpClient.get<TimesheetInfo>(`${this.apiUrl}/timesheet-info/${id}`);
  }

  public saveTimeReport(report: TimesheetInfo): Observable<number> {
    return this.httpClient.post<number>(`${this.apiUrl}/timesheet-info`, report);
  }
}
