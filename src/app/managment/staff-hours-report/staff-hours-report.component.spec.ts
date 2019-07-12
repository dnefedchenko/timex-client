import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffHoursReportComponent } from './staff-hours-report.component';
import {RouterTestingModule} from '@angular/router/testing';
import {ApproveTimesheetsComponent} from '../approve-timesheets/approve-timesheets.component';
import SpyObj = jasmine.SpyObj;
import {Router} from '@angular/router';
import {APPROVE_TIMESHEETS_URL} from '../../app.constants';

describe('StaffHoursReportComponent', () => {
  let testee: StaffHoursReportComponent;
  let fixture: ComponentFixture<StaffHoursReportComponent>;

  let routerSpy: SpyObj<Router> = jasmine.createSpyObj('Router', ['navigateByUrl']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffHoursReportComponent, ApproveTimesheetsComponent ],
      imports: [
        RouterTestingModule.withRoutes([
          {path: 'approve-timesheets', component: ApproveTimesheetsComponent}
        ])
      ],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffHoursReportComponent);
    testee = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(testee).toBeTruthy();
  });

  it('should navigate to timesheets apporval page', () => {
    testee.goToApprovalPage();

    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith(APPROVE_TIMESHEETS_URL);
  });
});
