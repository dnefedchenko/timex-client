import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkPaidComponent } from './mark-paid.component';

describe('MarkPaidComponent', () => {
  let component: MarkPaidComponent;
  let fixture: ComponentFixture<MarkPaidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkPaidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkPaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
