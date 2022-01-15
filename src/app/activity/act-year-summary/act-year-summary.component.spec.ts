import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActYearSummaryComponent } from './act-year-summary.component';

describe('ActYearSummaryComponent', () => {
  let component: ActYearSummaryComponent;
  let fixture: ComponentFixture<ActYearSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActYearSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActYearSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
