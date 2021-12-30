import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerMainComponent } from './per-main.component';

describe('PerMainComponent', () => {
  let component: PerMainComponent;
  let fixture: ComponentFixture<PerMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
