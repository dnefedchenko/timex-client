import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallSummaryComponent } from './overall-summary.component';
import SpyObj = jasmine.SpyObj;
import {ManagementService} from '../../managment/services/management.service';
import {summaryReports} from '../../app.constants';
import {of} from 'rxjs';

describe('OverallSummaryComponent', () => {
  let testee: OverallSummaryComponent;
  let fixture: ComponentFixture<OverallSummaryComponent>;

  const managementServiceSpy: SpyObj<ManagementService> = jasmine
    .createSpyObj('ManagementService', ['loadCurrentWeekSummaryReports']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverallSummaryComponent ],
      providers: [
        { provide: ManagementService, useValue: managementServiceSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    managementServiceSpy.loadCurrentWeekSummaryReports.and.returnValue(of(summaryReports));

    fixture = TestBed.createComponent(OverallSummaryComponent);
    testee = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize component properly and load summary reports', () => {
    expect(testee).toBeDefined();
    expect(testee.summaryReports).toEqual(summaryReports);
    expect(testee.averageHours).toBe(225.5);
    expect(testee.totalHours).toBe(902);
    expect(managementServiceSpy.loadCurrentWeekSummaryReports).toHaveBeenCalled();
  });
});
