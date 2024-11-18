import { TestBed } from '@angular/core/testing';

import { OrgnigationService } from './orgnigation.service';

describe('OrgnigationService', () => {
  let service: OrgnigationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrgnigationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
