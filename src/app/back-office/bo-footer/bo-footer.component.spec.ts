import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoFooterComponent } from './bo-footer.component';

describe('BoFooterComponent', () => {
  let component: BoFooterComponent;
  let fixture: ComponentFixture<BoFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
