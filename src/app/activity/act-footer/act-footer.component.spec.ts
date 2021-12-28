import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActFooterComponent } from './act-footer.component';

describe('ActFooterComponent', () => {
  let component: ActFooterComponent;
  let fixture: ComponentFixture<ActFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
