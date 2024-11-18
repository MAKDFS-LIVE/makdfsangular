import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P2pTradingComponent } from './p2p-trading.component';

describe('P2pTradingComponent', () => {
  let component: P2pTradingComponent;
  let fixture: ComponentFixture<P2pTradingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ P2pTradingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(P2pTradingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
