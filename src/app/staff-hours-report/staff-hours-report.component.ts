import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {APPROVE_TIMESHEETS_URL} from '../app.constants';

@Component({
  selector: 'app-staff-hours-report',
  templateUrl: './staff-hours-report.component.html',
  styleUrls: ['./staff-hours-report.component.scss']
})
export class StaffHoursReportComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public print(): void {
    console.log('Printing happens here');
  }

  public approve(): void {
    this.router.navigateByUrl(APPROVE_TIMESHEETS_URL);
  }
}
