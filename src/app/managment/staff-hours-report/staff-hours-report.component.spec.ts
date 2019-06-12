import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffHoursReportComponent } from './staff-hours-report.component';

describe('StaffHoursReportComponent', () => {
  let component: StaffHoursReportComponent;
  let fixture: ComponentFixture<StaffHoursReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffHoursReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffHoursReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
