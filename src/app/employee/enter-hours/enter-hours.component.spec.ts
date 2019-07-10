import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterHoursComponent } from './enter-hours.component';

xdescribe('EnterHoursComponent', () => {
  let component: EnterHoursComponent;
  let fixture: ComponentFixture<EnterHoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterHoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
