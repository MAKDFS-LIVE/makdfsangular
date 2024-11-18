import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCoinComponent } from './search-coin.component';

describe('SearchCoinComponent', () => {
  let component: SearchCoinComponent;
  let fixture: ComponentFixture<SearchCoinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchCoinComponent]
    });
    fixture = TestBed.createComponent(SearchCoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
