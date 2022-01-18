import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActMonthPubholidaysComponent } from './act-month-pubholidays.component';

describe('ActMonthPubholidaysComponent', () => {
  let component: ActMonthPubholidaysComponent;
  let fixture: ComponentFixture<ActMonthPubholidaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActMonthPubholidaysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActMonthPubholidaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
