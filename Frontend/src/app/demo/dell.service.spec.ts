import { TestBed } from '@angular/core/testing';

import { DellService } from './dell.service';

describe('DellService', () => {
  let service: DellService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DellService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
