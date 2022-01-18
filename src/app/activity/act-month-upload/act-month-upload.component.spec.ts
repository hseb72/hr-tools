import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActMonthUploadComponent } from './act-month-upload.component';

describe('ActMonthUploadComponent', () => {
  let component: ActMonthUploadComponent;
  let fixture: ComponentFixture<ActMonthUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActMonthUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActMonthUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
