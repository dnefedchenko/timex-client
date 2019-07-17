import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveTimesheetsComponent } from './approve-timesheets.component';
import {RouterTestingModule} from '@angular/router/testing';
import {StaffHoursReportComponent} from '../staff-hours-report/staff-hours-report.component';
import {FormArray, FormGroup, ReactiveFormsModule} from '@angular/forms';
import SpyObj = jasmine.SpyObj;
import {ManagementService} from '../services/management.service';
import {of, throwError} from 'rxjs';
import {STAFF_HOURS_REPORT_URL, staffHourReports} from '../../app.constants';
import {Router} from '@angular/router';

describe('ApproveTimesheetsComponent', () => {
  let testee: ApproveTimesheetsComponent;
  let fixture: ComponentFixture<ApproveTimesheetsComponent>;

  const managementServiceSpy: SpyObj<ManagementService>
    = jasmine.createSpyObj('ManagementService',
    ['loadCurrentWeekReports', 'updateReports']);
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveTimesheetsComponent, StaffHoursReportComponent ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'staff-hours-report', component: StaffHoursReportComponent }
        ]),
        ReactiveFormsModule
      ],
      providers: [
        { provide: ManagementService, useValue: managementServiceSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    spyOn(router, 'navigateByUrl');

    managementServiceSpy.loadCurrentWeekReports.and.returnValue(of(staffHourReports));
    managementServiceSpy.updateReports.and.returnValue(of(staffHourReports));

    fixture = TestBed.createComponent(ApproveTimesheetsComponent);
    testee = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should check approval form initialized correctly', () => {
    expect(testee).toBeDefined();
    expect(testee.approvalForm).toBeDefined();
    expect(testee.approvalForm.get('timesheets').value).toBeDefined();
    expect(testee.approvalForm.get('timesheets').value.length).toEqual(staffHourReports.length);
  });

  it('should save time report successfully', () => {
    testee.save();

    expect(managementServiceSpy.updateReports)
      .toHaveBeenCalledWith(testee.approvalForm.get('timesheets').value);
    expect(router.navigateByUrl).toHaveBeenCalledWith(STAFF_HOURS_REPORT_URL);
  });

  it('should fail to save time report', () => {
    managementServiceSpy.updateReports.and.returnValue(throwError({message: 'Something went wrong'}));

    testee.save();

    expect(managementServiceSpy.updateReports)
      .toHaveBeenCalledWith(testee.approvalForm.get('timesheets').value);
    expect(router.navigateByUrl).not.toHaveBeenCalled();
  });

  it('should reset approval form', () => {
    const timesheetsArray: FormArray = testee.approvalForm.get('timesheets') as FormArray;

    timesheetsArray.controls.forEach((t: FormGroup) => {
      t.get('approved').setValue(true);
      expect(t.get('approved').value).toBeTruthy();
    });

    testee.reset();

    timesheetsArray.controls.forEach((t: FormGroup) => {
      expect(t.get('approved').value).toBeUndefined();
    });
  });
});
