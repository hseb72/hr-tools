import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvPaylateComponent } from './inv-paylate.component';

describe('InvPaylateComponent', () => {
  let component: InvPaylateComponent;
  let fixture: ComponentFixture<InvPaylateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvPaylateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvPaylateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
