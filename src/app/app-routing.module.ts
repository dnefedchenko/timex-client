import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {TimesheetListComponent} from './employee/timesheet-list/timesheet-list.component';
import {EnterHoursComponent} from './employee/enter-hours/enter-hours.component';
import {StaffHoursReportComponent} from './managment/staff-hours-report/staff-hours-report.component';
import {ApproveTimesheetsComponent} from './managment/approve-timesheets/approve-timesheets.component';
import {PrintTimesheetComponent} from './employee/print-timesheet/print-timesheet.component';
import {MarkPaidComponent} from './accounting/mark-paid/mark-paid.component';
import {OverallSummaryComponent} from './executive/overall-summary/overall-summary.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'timesheet-list', component: TimesheetListComponent },
  { path: 'enter-hours/:timesheetId', component: EnterHoursComponent },
  { path: 'timesheets/:timesheetId/print', component: PrintTimesheetComponent },
  { path: 'staff-hours-report', component: StaffHoursReportComponent },
  { path: 'approve-timesheets', component: ApproveTimesheetsComponent },
  { path: 'mark-paid', component: MarkPaidComponent },
  { path: 'overall-summary', component: OverallSummaryComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
