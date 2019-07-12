import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Timesheet} from '../../model/timesheet.interface';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {
  constructor(@Inject('apiUrl') private apiUrl: string, private httpClient: HttpClient) {}

  public getEmployeeTimesheets(employeeId: number): Observable<Timesheet[]> {
    return this.httpClient.get<Timesheet[]>(`${this.apiUrl}/assets/timesheets.json`);
  }
}
