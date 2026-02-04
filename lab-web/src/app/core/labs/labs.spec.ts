import { TestBed } from '@angular/core/testing';

import { LabsService } from './labs';

describe('Labs', () => {
  let service: LabsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LabsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
