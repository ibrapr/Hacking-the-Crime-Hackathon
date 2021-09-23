import { TestBed } from '@angular/core/testing';

import { ReportResultService } from './report-results.service';

describe('ReportResultService', () => {
  let service: ReportResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
