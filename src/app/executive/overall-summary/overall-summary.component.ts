import { Component, OnInit } from '@angular/core';
import {OverallSummaryReport} from '../../model/executive/overall-summary.interface';
import {ManagementService} from '../../managment/services/management.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-overall-summary',
  templateUrl: './overall-summary.component.html',
  styleUrls: ['./overall-summary.component.scss']
})
export class OverallSummaryComponent implements OnInit {
  public summaryReports: OverallSummaryReport[];
  public totalHours = 0;
  public averageHours = 0;

  constructor(private managementService: ManagementService) { }

  ngOnInit() {
    this.loadSummaryReports();
  }

  public print(): void {}

  private loadSummaryReports() {
    this.managementService
      .loadCurrentWeekSummaryReports()
      .subscribe((reports: OverallSummaryReport[]) => {
        this.summaryReports = reports;
        this.summaryReports.forEach((report: OverallSummaryReport) => this.totalHours += report.hoursForWeek);
        this.averageHours = +(this.totalHours / reports.length).toFixed(2);
      }, (error: HttpErrorResponse) => {
        console.log(error.message);
      });
  }
}
