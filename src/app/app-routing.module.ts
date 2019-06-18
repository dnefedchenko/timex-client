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
import {AuthorizedGuard} from './authorized.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'timesheet-list', component: TimesheetListComponent, canActivate: [AuthorizedGuard] },
  { path: 'enter-hours/:timesheetId', component: EnterHoursComponent, canActivate: [AuthorizedGuard] },
  { path: 'timesheets/:timesheetId/print', component: PrintTimesheetComponent, canActivate: [AuthorizedGuard] },
  { path: 'staff-hours-report', component: StaffHoursReportComponent, canActivate: [AuthorizedGuard] },
  { path: 'approve-timesheets', component: ApproveTimesheetsComponent, canActivate: [AuthorizedGuard] },
  { path: 'mark-paid', component: MarkPaidComponent, canActivate: [AuthorizedGuard] },
  { path: 'overall-summary', component: OverallSummaryComponent, canActivate: [AuthorizedGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
