import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActMonthCalnavComponent } from './act-month-calnav.component';

describe('ActMonthCalnavComponent', () => {
  let component: ActMonthCalnavComponent;
  let fixture: ComponentFixture<ActMonthCalnavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActMonthCalnavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActMonthCalnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
