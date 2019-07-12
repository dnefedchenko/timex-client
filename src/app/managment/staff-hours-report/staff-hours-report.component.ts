import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {APPROVE_TIMESHEETS_URL} from '../../app.constants';
import {StaffHoursReport} from '../../model/staff-hours.report.interface';
import {ManagementService} from '../services/management.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-staff-hours-report',
  templateUrl: './staff-hours-report.component.html',
  styleUrls: ['./staff-hours-report.component.scss']
})
export class StaffHoursReportComponent implements OnInit {
  public reports: StaffHoursReport[] = [];
  public totalHours: number = 0;
  public averageHours: number = 0;

  constructor(private router: Router, private managementService: ManagementService) { }

  ngOnInit() {
    this.loadCurrentWeekReports();
  }

  private loadCurrentWeekReports(): void {
    this.managementService
      .loadCurrentWeekReports()
      .subscribe(
        (reports: StaffHoursReport[]) => {
          this.reports = reports;
          this.reports.forEach((report: StaffHoursReport) => this.totalHours += report.hoursForWeek);
          this.averageHours = +(this.totalHours / reports.length).toFixed(2);
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        });
  }

  public print(): void {
    console.log('Printing happens here');
  }

  public goToApprovalPage(): void {
    this.router.navigateByUrl(APPROVE_TIMESHEETS_URL);
  }
}
