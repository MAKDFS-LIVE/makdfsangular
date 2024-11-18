import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakWalletComponent } from './mak-wallet.component';

describe('MakWalletComponent', () => {
  let component: MakWalletComponent;
  let fixture: ComponentFixture<MakWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakWalletComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
