import { TestBed } from '@angular/core/testing';

import { WebServiseService } from './web-service.service';

describe('WebServiseService', () => {
  let service: WebServiseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebServiseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
