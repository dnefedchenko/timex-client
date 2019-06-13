import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Timesheet} from '../../model/timesheet.interface';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {
  constructor(private httpClient: HttpClient) {}

  public getEmployeeTimesheets(employeeId: number): Observable<Timesheet[]> {
    console.log(`Retrieving timesheets for employee id ${employeeId}`);
    return this.httpClient.get<Timesheet[]>('/assets/timesheets.json');
  }
}
