import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActMonthCurrentComponent } from './act-month-current.component';

describe('ActMonthCurrentComponent', () => {
  let component: ActMonthCurrentComponent;
  let fixture: ComponentFixture<ActMonthCurrentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActMonthCurrentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActMonthCurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
