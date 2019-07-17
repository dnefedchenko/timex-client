import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TIMESHEET_LIST_URL} from '../../app.constants';
import {EmployeeService} from '../services/employee.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Timesheet} from '../../model/employee/timesheet.interface';

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
      .getTimesheet(+this.timesheetId)
      .subscribe((timesheet: Timesheet) => {
        this.initTimeTrackingForm(timesheet);
      });
  }

  private initTimeTrackingForm(timesheet?: Timesheet) {
    this.timeTrackingForm = this.formBuilder.group({
      departmentName: [timesheet ? timesheet.departmentName : ''],
      mondayHours: [timesheet ? timesheet.mondayHours : '0.00'],
      tuesdayHours: [timesheet ? timesheet.tuesdayHours : '0.00'],
      wednesdayHours: [timesheet ? timesheet.wednesdayHours : '0.00'],
      thursdayHours: [timesheet ? timesheet.thursdayHours : '0.00'],
      fridayHours: [timesheet ? timesheet.fridayHours : '0.00'],
      saturdayHours: [timesheet ? timesheet.saturdayHours : '0.00'],
      sundayHours: [timesheet ? timesheet.sundayHours : '0.00']
    });
    this.pageLoadingCompleted = true;
  }

  public saveTimeReport(): void {
    this.timesheetService
      .saveTimeReport(this.timeTrackingForm.value as Timesheet)
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
      .filter(v => v[0] !== 'departmentName')
      .forEach(v => {
        totalHours += +v[1];
      });
    return totalHours;
  }
}
