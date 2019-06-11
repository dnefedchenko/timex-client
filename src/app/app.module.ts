import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TimesheetListComponent } from './timesheet-list/timesheet-list.component';
import { HeaderComponent } from './common/header/header.component';
import { EnterHoursComponent } from './enter-hours/enter-hours.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StaffHoursReportComponent } from './staff-hours-report/staff-hours-report.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    TimesheetListComponent,
    HeaderComponent,
    EnterHoursComponent,
    StaffHoursReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
