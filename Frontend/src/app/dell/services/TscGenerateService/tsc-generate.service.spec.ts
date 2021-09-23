import { TestBed } from '@angular/core/testing';

import { TscGenerateService } from './tsc-generate.service';

describe('TscGenerateService', () => {
  let service: TscGenerateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TscGenerateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
