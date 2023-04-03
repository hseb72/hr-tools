import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvAwaitedComponent } from './inv-awaited.component';

describe('InvAwaitedComponent', () => {
  let component: InvAwaitedComponent;
  let fixture: ComponentFixture<InvAwaitedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvAwaitedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvAwaitedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
