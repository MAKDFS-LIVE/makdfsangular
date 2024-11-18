import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayConformComponent } from './pay-conform.component';

describe('PayConformComponent', () => {
  let component: PayConformComponent;
  let fixture: ComponentFixture<PayConformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayConformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayConformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
