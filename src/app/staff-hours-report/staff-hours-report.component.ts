import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-staff-hours-report',
  templateUrl: './staff-hours-report.component.html',
  styleUrls: ['./staff-hours-report.component.scss']
})
export class StaffHoursReportComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public print(): void {
    console.log('Printing happens here');
  }

  public approve(): void {
    console.log('Report approval');
  }
}
