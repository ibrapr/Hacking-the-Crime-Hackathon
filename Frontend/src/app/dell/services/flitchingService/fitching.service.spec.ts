import { TestBed } from '@angular/core/testing';

import { FitchingService } from './fitching.service';

describe('FitchingService', () => {
  let service: FitchingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FitchingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
