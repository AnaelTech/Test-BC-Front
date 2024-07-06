import { TestBed } from '@angular/core/testing';

import { PrestationService } from './prestation.service';

describe('PrestationService', () => {
  let service: PrestationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrestationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
