import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TIMESHEET_LIST_URL} from '../../app.constants';
import {EmployeeService} from '../services/employee.service';
import {TimesheetInfo} from '../../model/timesheet-info.interface';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-timesheet',
  templateUrl: './enter-hours.component.html',
  styleUrls: ['./enter-hours.component.scss']
})
export class EnterHoursComponent implements OnInit {
  public timesheetId: string;
  public timeTrackingForm: FormGroup;
  public pageLoadingCompleted = false;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private timesheetService: EmployeeService) { }

  ngOnInit() {
    this.extractTimesheetId();

    if (!this.isTimesheetNew) {
      this.loadTimesheet();
    } else {
      this.initTimeTrackingForm();
    }
  }

  private extractTimesheetId() {
    this.timesheetId = this.activatedRoute.snapshot.paramMap.get('timesheetId');
  }

  public get isTimesheetNew(): boolean {
    return this.timesheetId === 'new';
  }

  private loadTimesheet() {
    this.timesheetService
      .getTimesheetInfo(+this.timesheetId)
      .subscribe((info: TimesheetInfo) => {
        this.initTimeTrackingForm(info);
      });
  }

  private initTimeTrackingForm(timesheetInfo?: TimesheetInfo) {
    this.timeTrackingForm = this.formBuilder.group({
      departmentName: [timesheetInfo ? timesheetInfo.departmentName : ''],
      mondayHours: [timesheetInfo ? timesheetInfo.mondayHours : '0.00'],
      tuesdayHours: [timesheetInfo ? timesheetInfo.tuesdayHours : '0.00'],
      wednesdayHours: [timesheetInfo ? timesheetInfo.wednesdayHours : '0.00'],
      thursdayHours: [timesheetInfo ? timesheetInfo.thursdayHours : '0.00'],
      fridayHours: [timesheetInfo ? timesheetInfo.fridayHours : '0.00'],
      saturdayHours: [timesheetInfo ? timesheetInfo.saturdayHours : '0.00'],
      sundayHours: [timesheetInfo ? timesheetInfo.sundayHours : '0.00']
    });
    this.pageLoadingCompleted = true;
  }

  public saveTimeReport(): void {
    this.timesheetService
      .saveTimeReport(this.timeTrackingForm.value as TimesheetInfo)
      .subscribe(
        (id: number) => {
          this.router.navigateByUrl(TIMESHEET_LIST_URL);
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        });
  }

  public cancelTimeRegistration(): void {
    this.router.navigateByUrl(TIMESHEET_LIST_URL);
  }

  public get totalHours(): number {
    let totalHours = 0;
    Object.entries(this.timeTrackingForm.value)
      .filter(v => v[0] !== 'department')
      .forEach(v => {
        totalHours += +v[1];
      });
    return totalHours;
  }
}
