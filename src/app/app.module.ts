import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './common/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StaffHoursReportComponent } from './managment/staff-hours-report/staff-hours-report.component';
import { ApproveTimesheetsComponent } from './managment/approve-timesheets/approve-timesheets.component';
import { MarkPaidComponent } from './accounting/mark-paid/mark-paid.component';
import { OverallSummaryComponent } from './executive/overall-summary/overall-summary.component';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { AppEmployeeModule } from './employee/app-employee.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    HeaderComponent,
    StaffHoursReportComponent,
    ApproveTimesheetsComponent,
    MarkPaidComponent,
    OverallSummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppEmployeeModule
  ],
  providers: [
    {provide: 'apiUrl', useValue: environment.apiUrl}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
