import { TestBed } from '@angular/core/testing';

import { ParameterService } from './parameter.service';

describe('ParamService', () => {
  let service: ParameterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParameterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
