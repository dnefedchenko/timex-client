import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Timesheet} from '../../model/employee/timesheet.interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(@Inject('apiUrl') private apiUrl: string, private httpClient: HttpClient) {}

  public getEmployeeTimesheets(employeeId: number): Observable<Timesheet[]> {
    return this.httpClient.get<Timesheet[]>(`${this.apiUrl}/timesheets`);
  }

  public getTimesheet(id: number) {
    return this.httpClient.get<Timesheet>(`${this.apiUrl}/timesheets/${id}`);
  }

  public saveTimeReport(report: Timesheet): Observable<number> {
    return this.httpClient.post<number>(`${this.apiUrl}/timesheets`, report);
  }
}
