import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActCalComponent } from './act-cal.component';

describe('ActCalComponent', () => {
  let component: ActCalComponent;
  let fixture: ComponentFixture<ActCalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActCalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActCalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
