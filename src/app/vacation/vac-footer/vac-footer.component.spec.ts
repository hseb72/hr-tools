import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacFooterComponent } from './vac-footer.component';

describe('VacFooterComponent', () => {
  let component: VacFooterComponent;
  let fixture: ComponentFixture<VacFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
