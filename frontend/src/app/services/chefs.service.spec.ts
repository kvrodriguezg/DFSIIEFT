import { TestBed } from '@angular/core/testing';

import { ChefsService } from './chefs.service';

describe('ChefsService', () => {
  let service: ChefsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChefsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
