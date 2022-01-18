import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActMonthSummaryComponent } from './act-month-summary.component';

describe('ActMonthSummaryComponent', () => {
  let component: ActMonthSummaryComponent;
  let fixture: ComponentFixture<ActMonthSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActMonthSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActMonthSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
