import { TestBed } from '@angular/core/testing';

import { PaciantService } from './paciant.service';

describe('PaciantService', () => {
  let service: PaciantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaciantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
