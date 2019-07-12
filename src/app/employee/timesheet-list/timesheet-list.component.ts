import { Component, OnInit } from '@angular/core';
import {Timesheet} from '../../model/timesheet.interface';
import {TimesheetService} from '../services/timesheet.service';
import {AuthService} from '../../login/services/auth/auth.service';

@Component({
  selector: 'app-timesheet-list',
  templateUrl: './timesheet-list.component.html',
  styleUrls: ['./timesheet-list.component.scss']
})
export class TimesheetListComponent implements OnInit {
  public employeeTimesheets: Timesheet[];

  constructor(private authService: AuthService, private timesheetService: TimesheetService) { }

  ngOnInit() {
    this.getEmployeeTimesheets();
  }

  private getEmployeeTimesheets() {
    const employeeId = this.authService.getCurrentEmployee().id;
    this.timesheetService.getEmployeeTimesheets(employeeId)
      .subscribe((timesheets: Timesheet[]) => {
      this.employeeTimesheets = timesheets;
    });
  }
}
