import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {HeaderComponent} from './common/header/header.component';

describe('AppComponent', () => {
  let testee: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        HeaderComponent,
        AppComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    testee = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should check component initialized', () => {
    expect(testee).toBeDefined();
    expect(testee.headingMessage).toEqual('Sign In');
  });
});
