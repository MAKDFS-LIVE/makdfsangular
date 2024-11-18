import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentHomeComponent } from './investment-home.component';

describe('InvestmentHomeComponent', () => {
  let component: InvestmentHomeComponent;
  let fixture: ComponentFixture<InvestmentHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestmentHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
