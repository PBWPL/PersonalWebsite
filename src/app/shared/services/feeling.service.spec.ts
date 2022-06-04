import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { FeelingService } from './feeling.service';

describe('FeelingService', () => {
  let service: FeelingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(FeelingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
