import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrProfileComponent } from './qr-profile.component';

describe('QrProfileComponent', () => {
  let component: QrProfileComponent;
  let fixture: ComponentFixture<QrProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
