import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppRoutingModule} from '../app-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {StaffHoursReportComponent} from './staff-hours-report/staff-hours-report.component';
import {ApproveTimesheetsComponent} from './approve-timesheets/approve-timesheets.component';

@NgModule({
  declarations: [StaffHoursReportComponent, ApproveTimesheetsComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule
  ]
})
export class AppManagementModule {

}
