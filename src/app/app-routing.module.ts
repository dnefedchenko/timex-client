import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {TimesheetListComponent} from './timesheet-list/timesheet-list.component';
import {EnterHoursComponent} from './enter-hours/enter-hours.component';
import {StaffHoursReportComponent} from './staff-hours-report/staff-hours-report.component';
import {ApproveTimesheetsComponent} from './approve-timesheets/approve-timesheets.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'timesheet-list', component: TimesheetListComponent },
  { path: 'enter-hours/:timesheetId', component: EnterHoursComponent },
  { path: 'staff-hours-report', component: StaffHoursReportComponent },
  { path: 'approve-timesheets', component: ApproveTimesheetsComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
