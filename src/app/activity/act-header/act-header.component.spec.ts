import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActHeaderComponent } from './act-header.component';

describe('ActHeaderComponent', () => {
  let component: ActHeaderComponent;
  let fixture: ComponentFixture<ActHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
