import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerFooterComponent } from './per-footer.component';

describe('PerFooterComponent', () => {
  let component: PerFooterComponent;
  let fixture: ComponentFixture<PerFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
