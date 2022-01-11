import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActMonthComponent } from './act-month.component';

describe('ActMonthComponent', () => {
  let component: ActMonthComponent;
  let fixture: ComponentFixture<ActMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActMonthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
