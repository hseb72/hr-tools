import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActTimeComponent } from './act-time.component';

describe('ActTimeComponent', () => {
  let component: ActTimeComponent;
  let fixture: ComponentFixture<ActTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
