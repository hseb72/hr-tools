import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvMainComponent } from './inv-main.component';

describe('InvMainComponent', () => {
  let component: InvMainComponent;
  let fixture: ComponentFixture<InvMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
