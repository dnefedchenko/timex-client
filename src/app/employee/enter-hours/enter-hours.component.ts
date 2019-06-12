import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TIMESHEET_LIST_URL} from '../../app.constants';

@Component({
  selector: 'app-timesheet',
  templateUrl: './enter-hours.component.html',
  styleUrls: ['./enter-hours.component.scss']
})
export class EnterHoursComponent implements OnInit {
  private timesheetId: string;
  public timeTrackingForm: FormGroup;
  public pageLoadingCompleted = false;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder) { }

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
    console.log('existing timesheet is loaded here');
    this.initTimeTrackingForm();
  }

  private initTimeTrackingForm() {
    this.timeTrackingForm = this.formBuilder.group({
      department: [''],
      monday: ['4.00'],
      tuesday: ['8.00'],
      wednesday: ['4.00'],
      thursday: ['0.00'],
      friday: ['0.00'],
      saturday: ['0.00'],
      sunday: ['0.00']
    });
    this.pageLoadingCompleted = true;
  }

  public saveTimeReport(): void {
    console.log(`Saving ${JSON.stringify(this.timeTrackingForm.value)}`);
    this.router.navigateByUrl(TIMESHEET_LIST_URL);
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
