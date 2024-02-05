import { TestBed } from '@angular/core/testing';

import { MongoApiService } from './mongo-api.service';

describe('MongoApiService', () => {
  let service: MongoApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MongoApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
