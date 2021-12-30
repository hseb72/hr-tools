import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerHeaderComponent } from './per-header.component';

describe('PerHeaderComponent', () => {
  let component: PerHeaderComponent;
  let fixture: ComponentFixture<PerHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
