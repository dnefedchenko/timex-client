import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {STAFF_HOURS_REPORT_URL} from '../../app.constants';
import {ManagementService} from '../services/management.service';
import {StaffHoursReport} from '../../model/manager/staff-hours.report.interface';
import {HttpErrorResponse} from '@angular/common/http';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-approve-timesheets',
  templateUrl: './approve-timesheets.component.html',
  styleUrls: ['./approve-timesheets.component.scss']
})
export class ApproveTimesheetsComponent implements OnInit {
  public approvalForm: FormGroup;

  constructor(private router: Router,
              private managementService: ManagementService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.loadCurrentWeekReports();
  }

  private loadCurrentWeekReports() {
    this.managementService
      .loadCurrentWeekReports()
      .subscribe((reports: StaffHoursReport[]) => {
        this.initTimesheetApprovalForm(reports);
      }, (error: HttpErrorResponse) => {
        console.log();
      });
  }

  private initTimesheetApprovalForm(reports?: StaffHoursReport[]) {
    if (!reports) {
      return;
    }

    this.approvalForm = this.formBuilder.group({
      timesheets: this.formBuilder.array([])
    });

    reports.forEach((report: StaffHoursReport) => {
      this.addReport(report);
    });
  }

  private addReport(report: StaffHoursReport) {
    const timesheetsArray: FormArray = this.approvalForm.get('timesheets') as FormArray;
    timesheetsArray.push(
      this.formBuilder
        .group({
          timesheetId: report.timesheetId,
          employeeName: report.employeeName,
          hoursForWeek: report.hoursForWeek,
          approved: report.approved
        })
    );
  }

  public save(): void {
    this.managementService
      .updateTimesheets(this.approvalForm.get('timesheets').value as StaffHoursReport[])
      .subscribe(response => {
        this.router.navigateByUrl(STAFF_HOURS_REPORT_URL);
      }, (error: HttpErrorResponse) => {
        console.log(error.message);
      });
  }

  public reset(): void {
    const timesheetsArray: FormArray = this.approvalForm.get('timesheets') as FormArray;
    timesheetsArray.controls.forEach((timesheet: FormGroup) => {
      timesheet.get('approved').setValue(undefined);
    });
  }
}
