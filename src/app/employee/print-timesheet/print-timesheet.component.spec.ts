import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintTimesheetComponent } from './print-timesheet.component';

describe('PrintTimesheetComponent', () => {
  let component: PrintTimesheetComponent;
  let fixture: ComponentFixture<PrintTimesheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintTimesheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintTimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
