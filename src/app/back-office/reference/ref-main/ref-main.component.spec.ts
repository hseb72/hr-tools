import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefMainComponent } from './ref-main.component';

describe('RefMainComponent', () => {
  let component: RefMainComponent;
  let fixture: ComponentFixture<RefMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RefMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RefMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
