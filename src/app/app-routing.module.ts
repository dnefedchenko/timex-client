import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {TimesheetListComponent} from './timesheet-list/timesheet-list.component';
import {EnterHoursComponent} from './timesheet/enter-hours.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'timesheet-list', component: TimesheetListComponent },
  { path: 'enter-hours/:timesheetId', component: EnterHoursComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
