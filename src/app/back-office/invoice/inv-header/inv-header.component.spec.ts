import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvHeaderComponent } from './inv-header.component';

describe('InvHeaderComponent', () => {
  let component: InvHeaderComponent;
  let fixture: ComponentFixture<InvHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
