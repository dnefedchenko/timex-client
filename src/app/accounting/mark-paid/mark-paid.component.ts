import { Component, OnInit } from '@angular/core';
import {ManagementService} from '../../managment/services/management.service';
import {HttpErrorResponse} from '@angular/common/http';
import {StaffHoursReport} from '../../model/manager/staff-hours.report.interface';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-mark-paid',
  templateUrl: './mark-paid.component.html',
  styleUrls: ['./mark-paid.component.scss']
})
export class MarkPaidComponent implements OnInit {
  public markPaidForm: FormGroup;
  public formInitializationCompleted = false;

  constructor(private managementService: ManagementService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.managementService
      .loadCurrentWeekReports()
      .subscribe((reports: StaffHoursReport[]) => {
        this.initMarkPaidForm(reports);
      }, (error: HttpErrorResponse) => {
        this.formInitializationCompleted = false;
        console.log();
      });
  }
  private initMarkPaidForm(reports: StaffHoursReport[]) {
    if (!reports) {
      return;
    }

    this.markPaidForm = this.formBuilder.group({
      timesheets: this.formBuilder.array([])
    });

    reports.forEach((report: StaffHoursReport) => {
      this.addReport(report);
    });
    this.formInitializationCompleted = true;
  }

  private addReport(report: StaffHoursReport) {
    const timesheetsArray: FormArray = this.markPaidForm.get('timesheets') as FormArray;
    timesheetsArray.push(
      this.formBuilder
        .group({
          timesheetId: report.timesheetId,
          employeeName: report.employeeName,
          hoursForWeek: report.hoursForWeek,
          markPaid: report.markPaid
        })
    );
  }

  public save(): void {
    this.managementService
      .updateTimesheets(this.markPaidForm.get('timesheets').value as StaffHoursReport[])
      .subscribe(response => {
        console.log(response);
      }, (error: HttpErrorResponse) => {
        console.log(error.message);
      });
  }

  public reset(): void {
    const timesheetsArray: FormArray = this.markPaidForm.get('timesheets') as FormArray;
    timesheetsArray.controls.forEach((timesheet: FormGroup) => {
      timesheet.get('markPaid').setValue(false);
    });
  }
}
