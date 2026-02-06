import { TestBed } from '@angular/core/testing';

import { Equipments } from './equipments';

describe('Equipments', () => {
  let service: Equipments;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Equipments);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
