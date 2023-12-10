import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacCalendarComponent } from './vac-calendar.component';

describe('VacCalendarComponent', () => {
  let component: VacCalendarComponent;
  let fixture: ComponentFixture<VacCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VacCalendarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VacCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
