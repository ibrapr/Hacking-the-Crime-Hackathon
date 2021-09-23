import { TestBed } from '@angular/core/testing';

import { ActionAlertService } from './action-alert.service';

describe('ActionAlertService', () => {
  let service: ActionAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActionAlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
