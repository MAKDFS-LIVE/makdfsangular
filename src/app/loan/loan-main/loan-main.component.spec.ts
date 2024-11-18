import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanMainComponent } from './loan-main.component';

describe('LoanMainComponent', () => {
  let component: LoanMainComponent;
  let fixture: ComponentFixture<LoanMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
