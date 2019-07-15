import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkPaidComponent } from './mark-paid.component';
import {FormArray, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ManagementService} from '../../managment/services/management.service';
import SpyObj = jasmine.SpyObj;
import {STAFF_HOURS_REPORT_URL, staffHourReports} from '../../app.constants';
import {of, throwError} from 'rxjs';
import {RouterTestingModule} from '@angular/router/testing';

describe('MarkPaidComponent', () => {
  let testee: MarkPaidComponent;
  let fixture: ComponentFixture<MarkPaidComponent>;
  const managementServiceSpy: SpyObj<ManagementService>
    = jasmine.createSpyObj('ManagementService',
    ['loadCurrentWeekReports', 'updateTimesheets']);
  const timesheetArrayName = 'timesheets';
  const markPaidControlName = 'markPaid';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkPaidComponent ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: ManagementService, useValue: managementServiceSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    managementServiceSpy.loadCurrentWeekReports.and.returnValue(of(staffHourReports));
    managementServiceSpy.updateTimesheets.and.returnValue(of(staffHourReports));

    fixture = TestBed.createComponent(MarkPaidComponent);
    testee = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should check approval form initialized correctly', () => {
    expect(testee).toBeDefined();
    expect(testee.markPaidForm).toBeDefined();
    expect(testee.markPaidForm.get(timesheetArrayName).value).toBeDefined();
    expect(testee.markPaidForm.get(timesheetArrayName).value.length).toEqual(staffHourReports.length);
  });

  it('should save time report successfully', () => {
    testee.save();

    expect(managementServiceSpy.updateTimesheets)
      .toHaveBeenCalledWith(testee.markPaidForm.get(timesheetArrayName).value);
  });

  it('should fail to save time report', () => {
    managementServiceSpy.updateTimesheets.and.returnValue(throwError({message: 'Something went wrong'}));

    testee.save();

    expect(managementServiceSpy.updateTimesheets)
      .toHaveBeenCalledWith(testee.markPaidForm.get(timesheetArrayName).value);
  });

  it('should reset mark paid form', () => {
    const timesheetsArray: FormArray = testee.markPaidForm.get(timesheetArrayName) as FormArray;

    timesheetsArray.controls.forEach((t: FormGroup) => {
      t.get(markPaidControlName).setValue(true);
      expect(t.get(markPaidControlName).value).toBeTruthy();
    });

    testee.reset();

    timesheetsArray.controls.forEach((t: FormGroup) => {
      expect(t.get(markPaidControlName).value).toBeFalsy();
    });
  });
});
