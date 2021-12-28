import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacMainComponent } from './vac-main.component';

describe('VacMainComponent', () => {
  let component: VacMainComponent;
  let fixture: ComponentFixture<VacMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
