import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActAlertComponent } from './act-alert.component';

describe('ActAlertComponent', () => {
  let component: ActAlertComponent;
  let fixture: ComponentFixture<ActAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
