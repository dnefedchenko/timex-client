import { Component, OnInit } from '@angular/core';
import {Timesheet} from '../../model/timesheet.interface';
import {TimesheetService} from '../services/timesheet.service';
import {CURRENT_EMPLOYEE_KEY} from '../../app.constants';

@Component({
  selector: 'app-timesheet-list',
  templateUrl: './timesheet-list.component.html',
  styleUrls: ['./timesheet-list.component.scss']
})
export class TimesheetListComponent implements OnInit {
  public employeeTimesheets: Timesheet[];

  constructor(private timesheetService: TimesheetService) { }

  ngOnInit() {
    this.getEmployeeTimesheets();
  }

  private getEmployeeTimesheets() {
    const employeeId = JSON.parse(localStorage.getItem(CURRENT_EMPLOYEE_KEY)).id;
    console.log(`Fetching timesheets for employee with id ${employeeId}`);
    this.timesheetService.getEmployeeTimesheets(employeeId)
      .subscribe((timesheets: Timesheet[]) => {
      this.employeeTimesheets = timesheets;
    });
  }
}
