import { TestBed } from '@angular/core/testing';

import { NavigationHistoryServiceService } from './navigation-history-service.service';

describe('NavigationHistoryServiceService', () => {
  let service: NavigationHistoryServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigationHistoryServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
