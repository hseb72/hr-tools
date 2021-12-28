import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActMainComponent } from './act-main.component';

describe('ActMainComponent', () => {
  let component: ActMainComponent;
  let fixture: ComponentFixture<ActMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
