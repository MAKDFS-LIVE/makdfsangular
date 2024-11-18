import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P2pAccountsComponent } from './p2p-accounts.component';

describe('P2pAccountsComponent', () => {
  let component: P2pAccountsComponent;
  let fixture: ComponentFixture<P2pAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ P2pAccountsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(P2pAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
