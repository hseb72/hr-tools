import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacHeaderComponent } from './vac-header.component';

describe('VacHeaderComponent', () => {
  let component: VacHeaderComponent;
  let fixture: ComponentFixture<VacHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
