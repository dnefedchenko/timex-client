import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {STAFF_HOURS_REPORT_URL} from '../app.constants';

@Component({
  selector: 'app-approve-timesheets',
  templateUrl: './approve-timesheets.component.html',
  styleUrls: ['./approve-timesheets.component.scss']
})
export class ApproveTimesheetsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public save(): void {
    this.router.navigateByUrl(STAFF_HOURS_REPORT_URL);
  }

  public reset(): void {
    console.log('Resetting...');
  }
}
