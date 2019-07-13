import {NgModule} from '@angular/core';
import {TimesheetListComponent} from './timesheet-list/timesheet-list.component';
import {EnterHoursComponent} from './enter-hours/enter-hours.component';
import {PrintTimesheetComponent} from './print-timesheet/print-timesheet.component';
import {AppRoutingModule} from '../app-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    TimesheetListComponent,
    EnterHoursComponent,
    PrintTimesheetComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    TimesheetListComponent,
    EnterHoursComponent,
    PrintTimesheetComponent
  ]
})
export class AppEmployeeModule {

}
