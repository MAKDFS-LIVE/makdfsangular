import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanempatyComponent } from './loanempaty.component';

describe('LoanempatyComponent', () => {
  let component: LoanempatyComponent;
  let fixture: ComponentFixture<LoanempatyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoanempatyComponent]
    });
    fixture = TestBed.createComponent(LoanempatyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
