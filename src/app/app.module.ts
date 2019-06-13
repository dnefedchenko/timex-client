import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TimesheetListComponent } from './employee/timesheet-list/timesheet-list.component';
import { HeaderComponent } from './common/header/header.component';
import { EnterHoursComponent } from './employee/enter-hours/enter-hours.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StaffHoursReportComponent } from './managment/staff-hours-report/staff-hours-report.component';
import { ApproveTimesheetsComponent } from './managment/approve-timesheets/approve-timesheets.component';
import { PrintTimesheetComponent } from './employee/print-timesheet/print-timesheet.component';
import { MarkPaidComponent } from './accounting/mark-paid/mark-paid.component';
import { OverallSummaryComponent } from './executive/overall-summary/overall-summary.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    TimesheetListComponent,
    HeaderComponent,
    EnterHoursComponent,
    StaffHoursReportComponent,
    ApproveTimesheetsComponent,
    PrintTimesheetComponent,
    MarkPaidComponent,
    OverallSummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
