import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefHeaderComponent } from './ref-header.component';

describe('RefHeaderComponent', () => {
  let component: RefHeaderComponent;
  let fixture: ComponentFixture<RefHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RefHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RefHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
