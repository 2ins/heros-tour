import { TestBed } from '@angular/core/testing';

import { TableParserServiceService } from './table-parser-service.service';

describe('TableParserServiceService', () => {
  let service: TableParserServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableParserServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
