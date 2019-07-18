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

  constructor(private managementService: ManagementService) { }

  ngOnInit() {
    this.managementService
      .loadCurrentWeekSummaryReports()
      .subscribe((reports: OverallSummaryReport[]) => {
        this.summaryReports = reports;
      }, (error: HttpErrorResponse) => {
        console.log(error.message);
      });
  }

  public print(): void {}
}
