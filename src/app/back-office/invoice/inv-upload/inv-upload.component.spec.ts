import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvUploadComponent } from './inv-upload.component';

describe('InvUploadComponent', () => {
  let component: InvUploadComponent;
  let fixture: ComponentFixture<InvUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
