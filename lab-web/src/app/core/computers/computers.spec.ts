import { TestBed } from '@angular/core/testing';

import { Computers } from './computers';

describe('Computers', () => {
  let service: Computers;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Computers);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
