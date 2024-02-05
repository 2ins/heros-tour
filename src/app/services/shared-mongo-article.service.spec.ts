import { TestBed } from '@angular/core/testing';

import { SharedMongoArticleService } from './shared-mongo-article.service';

describe('SharedMongoArticleService', () => {
  let service: SharedMongoArticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedMongoArticleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
